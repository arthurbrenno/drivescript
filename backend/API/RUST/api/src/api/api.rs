use actix_web::{web, App, HttpServer, Responder, HttpResponse, get, post};
use actix_web::web::Data;
use std::sync::Mutex;

use crate::{
    repository::database::Database
};

#[get("/api/alunos")]
pub async fn get_alunos(data: Data<Mutex<Database>>) -> HttpResponse {
    let mut db = data.lock().unwrap();
    let result = db.get_alunos();
    match result {
        Ok(alunos) => HttpResponse::Ok().json(alunos),
        Err(_)     => HttpResponse::InternalServerError().into(),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(get_alunos);
}