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
