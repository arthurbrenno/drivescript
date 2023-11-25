use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Aluno {
    pub id: Option<i32>,
    pub nome: String,
    pub cpf: String,
    pub data_nascimento: Option<DateTime<Utc>>,
    pub endereco: String,
    pub telefone: String,
}