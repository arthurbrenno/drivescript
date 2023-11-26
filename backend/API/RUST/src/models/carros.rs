use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Carro {
    pub id: Option<i32>,
    pub marca: String,
    pub modelo: String,
    pub ano: i32,
    pub placa: String,
    pub capacidade_passageiros: i32,
}