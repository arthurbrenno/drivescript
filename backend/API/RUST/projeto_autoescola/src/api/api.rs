use actix_web::web;
use std::sync::Mutex;

use actix_web::{web::{
    Data,
    Json,
}, post, HttpResponse};

use crate::{
    models::alunos::Aluno, 
    models::carros::Carro,
    models::agendamentos::Agendamento,
    repository::database::Database
};

#[post("/alunos")]
pub async fn get_alunos(db: Data<Mutex<Database>>) -> HttpResponse {
    let mut db = db.lock().unwrap();
    let result = db.get_alunos();
    match result {
        Ok(alunos) => HttpResponse::Ok().json(alunos),
        Err(_)     => HttpResponse::InternalServerError().into(),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(get_alunos)
    );
}