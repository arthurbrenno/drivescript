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

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL não encontrada");
    let opts = mysql::OptsBuilder::new()
    .ip_or_hostname(Some("localhost".to_string()))
    .db_name(Some("drivescript".to_string()))
    .user(Some("root".to_string()))
    .pass(Some("".to_string()));

    let pool = mysql::Pool::new(opts).unwrap(); 
    let conn = pool.get_conn().unwrap();
    let database = repository::database::Database::new(conn);

    let app_data = web::Data::new(database);

    HttpServer::new(move || 
        App::new()
            .app_data(app_data.clone())
            .configure(api::api::config)
            .service(healthcheck)
            .default_service(web::route().to(not_found))
            .wrap(actix_web::middleware::Logger::default())
    )
        .bind(("127.0.0.1", 3000))?
        .run()
        .await
}
