
use chrono::prelude::*;

use mysql::*;
use mysql::prelude::*;
use mysql::Value;
use chrono::{NaiveDate, NaiveTime, NaiveDateTime, DateTime, Utc};


use crate::models::alunos::Aluno;
use crate::models::carros::Carro;
use crate::models::agendamentos::Agendamento;

pub struct Database {
    conn: PooledConn,
}

impl Database {
    pub fn new(conn: PooledConn) -> Self {
        Database { conn }
    }

    // ....###....##.......##.....##.##....##..#######...######.
    // ...##.##...##.......##.....##.###...##.##.....##.##....##
    // ..##...##..##.......##.....##.####..##.##.....##.##......
    // .##.....##.##.......##.....##.##.##.##.##.....##..######.
    // .#########.##.......##.....##.##..####.##.....##.......##
    // .##.....##.##.......##.....##.##...###.##.....##.##....##
    // .##.....##.########..#######..##....##..#######...######.
    
    // ..######.
    // .##....##
    // .##......
    // .##......
    // .##......
    // .##....##
    // ..######.

    pub async fn create_aluno(&mut self, aluno: Aluno) -> Result<Aluno, mysql::Error> {
        let query = r"INSERT INTO alunos (nome, cpf, data_nascimento, endereco, telefone) VALUES (?, ?, ?, ?, ?)";
        let data_nascimento_str = aluno.data_nascimento.expect("Data inválida").to_rfc3339();
        self.conn.exec_drop(query, (&aluno.nome, &aluno.cpf, &data_nascimento_str, &aluno.endereco, &aluno.telefone))?;
        Ok(aluno)
    }

    // .########.
    // .##.....##
    // .##.....##
    // .########.
    // .##...##..
    // .##....##.
    // .##.....##

    pub fn get_alunos(&mut self) -> Result<Vec<Aluno>, mysql::Error> {
        let query = r"SELECT * FROM alunos";
        let result = self.conn.query_map(query, |(id, nome, cpf, data_nascimento, endereco, telefone)| {
            let data_nascimento = match data_nascimento {
                Value::Date(year, month, day, hour, min, sec, _) => {
                    Some(NaiveDateTime::new(NaiveDate::from_ymd(year as i32, month as u32, day as u32), NaiveTime::from_hms(hour as u32, min as u32, sec as u32)))
                },
                _ => None,
            };
            let data_nascimento = data_nascimento.map(|dt| DateTime::<Utc>::from_utc(dt, Utc));
            Ok(Aluno {
                id: Some(id),
                nome,
                cpf,
                data_nascimento,
                endereco,
                telefone,
            })
        })?;
    
        let result: Result<Vec<_>, _> = result.into_iter().collect();
        result
    }

    pub fn get_aluno_by_id(&mut self, id: u32) -> Result<Option<Aluno>, mysql::Error> {
        let result: Vec<Aluno> = self.conn.exec_map(
            r"SELECT * FROM alunos WHERE id = :id",
            params! {"id" => id},
            |(id, nome, cpf, data_nascimento, endereco, telefone)| {
                let data_nascimento = match data_nascimento {
                    Value::Date(year, month, day, hour, min, sec, _) => {
                        Some(NaiveDateTime::new(NaiveDate::from_ymd(year as i32, month as u32, day as u32), NaiveTime::from_hms(hour as u32, min as u32, sec as u32)))
                    },
                    _ => None,
                };
                let data_nascimento = data_nascimento.map(|dt| DateTime::<Utc>::from_utc(dt, Utc));
                Aluno {
                    id: Some(id),
                    nome,
                    cpf,
                    data_nascimento,
                    endereco,
                    telefone,
                }
            }
        )?;
    
        Ok(result.into_iter().next())
    }

    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // ..#######.

    pub fn update_aluno(&mut self, aluno: Aluno) -> Result<Aluno, mysql::Error> {
        self.conn.exec_drop(
            r"UPDATE alunos SET nome = :nome, cpf = :cpf, data_nascimento = :data_nascimento, endereco = :endereco, telefone = :telefone WHERE id = :id",
            params! {
                "nome" => &aluno.nome,
                "cpf" => &aluno.cpf,
                "data_nascimento" => aluno.data_nascimento.map(|dt| mysql::Value::from(dt.naive_utc().timestamp())),
                "endereco" => &aluno.endereco,
                "telefone" => &aluno.telefone,
                "id" => aluno.id.unwrap()
            }
        )?;
        Ok(aluno)
    }

    // .########.
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .########.
    pub fn delete_aluno(&mut self, id: u32) -> Result<(), mysql::Error> {
        self.conn.exec_drop(
            r"DELETE FROM alunos WHERE id = :id",
            params! {
                "id" => id
            }
        )?;
        Ok(())
    }










    // ..######.....###....########..########...#######...######.
    // .##....##...##.##...##.....##.##.....##.##.....##.##....##
    // .##........##...##..##.....##.##.....##.##.....##.##......
    // .##.......##.....##.########..########..##.....##..######.
    // .##.......#########.##...##...##...##...##.....##.......##
    // .##....##.##.....##.##....##..##....##..##.....##.##....##
    // ..######..##.....##.##.....##.##.....##..#######...######.
    // ..######.
    // .##....##
    // .##......
    // .##......
    // .##......
    // .##....##
    // ..######.

    pub fn create_carro(&mut self, carro: Carro) -> Result<Carro, mysql::Error> {
        self.conn.exec_drop(
            r"INSERT INTO carros (placa, marca, modelo, ano) VALUES (:placa, :marca, :modelo, :ano)",
            params! {
                "placa" => &carro.placa,
                "marca" => &carro.marca,
                "modelo" => &carro.modelo,
                "ano" => carro.ano
            }
        )?;
        Ok(carro)
    }

    // .########.
    // .##.....##
    // .##.....##
    // .########.
    // .##...##..
    // .##....##.
    // .##.....##

    pub fn get_carros(&mut self) -> Result<Vec<Carro>, mysql::Error> {
        let carros: Vec<Result<Carro, _>> = self.conn.exec_map(
            r"SELECT * FROM carros",
            (),
            |(id, placa, marca, modelo, ano, capacidade_passageiros)| {
                Ok(Carro {
                    id: Some(id),
                    placa,
                    marca,
                    modelo,
                    ano,
                    capacidade_passageiros,
                })
            }
        )?;
        let carros: Result<Vec<_>, _> = carros.into_iter().collect();
        carros
    }

    pub fn get_carro(&mut self, id: i32) -> Result<Carro, mysql::Error> {
        let carros: Vec<Result<Carro, _>> = self.conn.exec_map(
            r"SELECT * FROM carros WHERE id = :id",
            params! {
                "id" => id
            },
            |(id, placa, marca, modelo, ano, capacidade_passageiros)| {
                Ok(Carro {
                    id: Some(id),
                    placa,
                    marca,
                    modelo,
                    ano,
                    capacidade_passageiros,
                })
            }
        )?;
        let carros: Result<Vec<_>, _> = carros.into_iter().collect();
        carros.map(|mut v| v.pop().unwrap())
    }

    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // ..#######.

    pub fn update_carro(&mut self, carro: Carro) -> Result<Carro, mysql::Error> {
        self.conn.exec_drop(
            r"UPDATE carros SET placa = :placa, marca = :marca, modelo = :modelo, ano = :ano, capacidade_passageiros = :capacidade_passageiros WHERE id = :id",
            params! {
                "placa" => &carro.placa,
                "marca" => &carro.marca,
                "modelo" => &carro.modelo,
                "ano" => carro.ano,
                "capacidade_passageiros" => carro.capacidade_passageiros,
                "id" => carro.id.unwrap()
            }
        )?;
        Ok(carro)
    }

    // .########.
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .########.
    pub fn delete_carro(&mut self, id: u32) -> Result<(), mysql::Error> {
        self.conn.exec_drop(
            r"DELETE FROM carros WHERE id = :id",
            params! {
                "id" => id
            }
        )?;
        Ok(())
    }

    // ....###.....######...########.##....##.########.....###....##.....##.########.##....##.########..#######...######.
    // ...##.##...##....##..##.......###...##.##.....##...##.##...###...###.##.......###...##....##....##.....##.##....##
    // ..##...##..##........##.......####..##.##.....##..##...##..####.####.##.......####..##....##....##.....##.##......
    // .##.....##.##...####.######...##.##.##.##.....##.##.....##.##.###.##.######...##.##.##....##....##.....##..######.
    // .#########.##....##..##.......##..####.##.....##.#########.##.....##.##.......##..####....##....##.....##.......##
    // .##.....##.##....##..##.......##...###.##.....##.##.....##.##.....##.##.......##...###....##....##.....##.##....##
    // .##.....##..######...########.##....##.########..##.....##.##.....##.########.##....##....##.....#######...######.
    // ..######.
    // .##....##
    // .##......
    // .##......
    // .##......
    // .##....##
    // ..######.
    pub fn create_agendamento(&mut self, agendamento: Agendamento) -> Result<Agendamento, mysql::Error> {
        self.conn.exec_drop(
            r"INSERT INTO agendamentos (aluno_id, carro_id, data_aula, horario_aula) VALUES (:aluno_id, :carro_id, :data_aula, :horario_aula)",
            params! {
                "aluno_id" => agendamento.aluno_id,
                "carro_id" => agendamento.carro_id,
                "data_aula" => &agendamento.data_aula,
                "horario_aula" => &agendamento.horario_aula
            }
        )?;
        Ok(agendamento)
    }

    // .########.
    // .##.....##
    // .##.....##
    // .########.
    // .##...##..
    // .##....##.
    // .##.....##
    pub fn get_agendamentos(&mut self) -> Result<Vec<Agendamento>, mysql::Error> {
        let agendamentos: Vec<Agendamento> = self.conn.query_map(
            r"SELECT id, aluno_id, carro_id, data_aula, horario_aula FROM agendamentos",
            |(id, aluno_id, carro_id, data_aula, horario_aula): (i32, i32, i32, Option<String>, Option<String>)| {
                let data_aula = data_aula.and_then(|d| DateTime::parse_from_rfc3339(&d).ok()).map(|d| d.to_rfc3339());
                let horario_aula = horario_aula.and_then(|h| DateTime::parse_from_rfc3339(&h).ok()).map(|h| h.to_rfc3339());
                Agendamento {
                    id: Some(id),
                    aluno_id,
                    carro_id,
                    data_aula: data_aula.unwrap_or_else(String::new),
                    horario_aula: horario_aula.unwrap_or_else(String::new),
                }
            },
        )?;
        Ok(agendamentos)
    }

    pub fn get_agendamento_by_id(&mut self, id: i32) -> Result<Option<Agendamento>, mysql::Error> {
        let mut results: Vec<Agendamento> = self.conn.exec_map(
            r"SELECT id, aluno_id, carro_id, data_aula, horario_aula FROM agendamentos WHERE id = :id",
            params! {
                "id" => id
            },
            |(id, aluno_id, carro_id, data_aula, horario_aula)| {
                Agendamento {
                    id: Some(id),
                    aluno_id,
                    carro_id,
                    data_aula,
                    horario_aula,
                }
            },
        )?;
        Ok(results.pop())
    }

    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // ..#######.

    pub fn update_agendamento(&mut self, agendamento: Agendamento) -> Result<Agendamento, mysql::Error> {
        self.conn.exec_drop(
            r"UPDATE agendamentos SET aluno_id = :aluno_id, carro_id = :carro_id, data_aula = :data_aula, horario_aula = :horario_aula WHERE id = :id",
            params! {
                "aluno_id" => agendamento.aluno_id,
                "carro_id" => agendamento.carro_id,
                "data_aula" => &agendamento.data_aula,
                "horario_aula" => &agendamento.horario_aula,
                "id" => agendamento.id.unwrap()
            }
        )?;
        Ok(agendamento)
    }

    // .########.
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .##.....##
    // .########.
    
    pub fn delete_agendamento(&mut self, id: i32) -> Result<(), mysql::Error> {
        self.conn.exec_drop(
            r"DELETE FROM agendamentos WHERE id = :id",
            params! {
                "id" => id
            }
        )?;
        Ok(())
    }
    
}

