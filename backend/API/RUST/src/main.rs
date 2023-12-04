mod api;
mod models;
mod repository;

use actix_web::{get, web, App, HttpResponse, HttpServer, Responder, Result};
use serde::{Serialize};

#[derive(Serialize)]
pub struct Response {
    pub status: String,
    pub message: String,
}


#[get("/health")]
async fn healthcheck() -> impl Responder {
    let response = Response {
        status: "200".to_string(),
        message: "Tudo está funcionando perfeitamente.".to_string(),
    };
    HttpResponse::Ok().json(response)
}

async fn not_found() -> Result<HttpResponse> {
    let response = Response {
        status: "404".to_string(),
        message: "404 Recurso não encontrado".to_string(),
    };
    Ok(HttpResponse::NotFound().json(response))
}

pub struct AppData {
    database: repository::database::Database,
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    let _database_url = "mysql://root@127.0.0.1:3306/drivescript";
    let opts = mysql::OptsBuilder::new()
        .ip_or_hostname(Some("127.0.0.1".to_string()))
        .db_name(Some("drivescript".to_string()))
        .user(Some("root".to_string()))
        .pass(Some("".to_string()));

    let pool = match mysql::Pool::new(opts) {
        Ok(pool) => pool,
        Err(e) => {
            eprintln!("Failed to create MySQL connection pool: {}", e);
            return Ok(());
        }
    };

    let conn = match pool.get_conn() {
        Ok(conn) => conn,
        Err(e) => {
            eprintln!("Failed to get MySQL connection: {}", e);
            return Ok(());
        }
    };

    println!("Conectado com sucesso!");
    let database = repository::database::Database::new(conn);

    let app_data = web::Data::new(AppData { database });
    HttpServer::new(move || 
        App::new()
            .app_data(app_data.clone())
            .configure(api::api::config)
    )
    .bind(("127.0.0.1", 3000))?
    .run()
    .await?;

    Ok(())
}


/**
use actix_web::{web, App, HttpResponse, HttpServer};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Serialize, Deserialize};
use sqlx::{MySql, Pool, Row};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    userid: i32,
    nivel_permissao: i32,
    exp: usize,
}

#[derive(Debug, Serialize, Deserialize)]
struct UserData {
    user: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AuthResponse {
    auth: bool,
    token: String,
    usuario: UserData,
}

#[derive(Debug, Serialize, Deserialize)]
struct AuthError {
    status: &'static str,
    message: &'static str,
}

async fn login(data: web::Json<UserData>, pool: web::Data<Pool<MySql>>) -> HttpResponse {
    let user = data.user.clone();
    let password = data.password.clone();

    // Consulta ao banco de dados
    let query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
    let row = sqlx::query(query)
        .bind(&user)
        .bind(&password)
        .fetch_one(pool.get_ref())
        .await;

    match row {
        Ok(row) => {
            // Crie o token JWT
            let claims = Claims {
                userid: row.get("id"),
                nivel_permissao: row.get("nivel_perm"),
                exp: 10_000_000_000, // Define o tempo de expiração do token (10 bilhões de segundos)
            };

            let jwt_secret = "autodrivescript";
            let key = EncodingKey::from_secret(jwt_secret.as_ref());
            let token = encode(&Header::default(), &claims, &key).unwrap();

            HttpResponse::Ok().json(AuthResponse {
                auth: true,
                token,
                usuario: UserData { user, password: "".to_string() },
            })
        }
        Err(_) => HttpResponse::Unauthorized().json(AuthError {
            status: "Unauthorized",
            message: "Credenciais inválidas.",
        }),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Configuração do banco de dados
    let db_host = env::var("DB_HOST").unwrap_or_else(|_| String::from("localhost"));
    let db_user = env::var("DB_USER").unwrap_or_else(|_| String::from("root"));
    let db_pass = env::var("DB_PASS").unwrap_or_else(|_| String::from(""));
    let db_name = env::var("DATABASE").unwrap_or_else(|_| String::from("drivescript"));

    let db_url = format!("mysql://{}:{}@{}/{}", db_user, db_pass, db_host, db_name);

    // Criação do pool de conexão com o banco de dados
    let pool = Pool::<MySql>::connect(&db_url).await.unwrap();

    // Inicialização do servidor Actix com o pool de banco de dados como dado compartilhado
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(web::resource("/api/login").route(web::post().to(login)))
    })
    .bind("127.0.0.1:3000")?
    .run()
    .await
}
*/
