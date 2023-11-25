use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Agendamento {
    pub id: Option<i32>,
    pub aluno_id: i32,
    pub carro_id: i32,
    pub data_aula: String,
    pub horario_aula: String,
}