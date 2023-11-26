---
title: DriveScript v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# DriveScript

> v1.0.0

Base URLs:

* <a href="https://localhost:3000">Testing Env: https://localhost:3000</a>

# Authentication

# Alunos

## GET /api/alunos/

GET /api/alunos/

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|x-access-token|header|string| yes |none|

> Response Examples

> 403

```json
{
  "status": "Forbidden",
  "message": "Token não fornecido."
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|403|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» message|string|true|none||none|

## GET /api/alunos/{id}

GET /api/alunos/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| yes |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

## POST /api/alunos/criar

POST /api/alunos/criar

> Body Parameters

```json
{
  "nome": "string",
  "cpf": "string",
  "data_nascimento": "string",
  "endereco": "string",
  "telefone": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|x-access-token|header|string| yes |none|
|body|body|object| no |none|
|» nome|body|string| yes |none|
|» cpf|body|string| yes |none|
|» data_nascimento|body|string| yes |none|
|» endereco|body|string| yes |none|
|» telefone|body|string| yes |none|

> Response Examples

> 401

```json
{
  "status": "Unauthorized",
  "message": "Token inválido."
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|401|Inline|

### Responses Data Schema

HTTP Status Code **401**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» message|string|true|none||none|

## PUT /api/alunos/update/{id}

PUT /api/alunos/update/{id}

> Body Parameters

```json
{
  "nome": "string",
  "cpf": "string",
  "data_nascimento": "string",
  "endereco": "string",
  "telefone": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| yes |none|
|body|body|object| no |none|
|» nome|body|string| yes |none|
|» cpf|body|string| yes |none|
|» data_nascimento|body|string| yes |none|
|» endereco|body|string| yes |none|
|» telefone|body|string| yes |none|

> Response Examples

> 403

```json
{
  "status": "Forbidden",
  "message": "Token não fornecido."
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|403|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» message|string|true|none||none|

## DELETE /api/alunos/delete/{id}

DELETE /api/alunos/delete/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| yes |none|

> Response Examples

> Success

```json
{
  "status": "OK"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|

# Carros

## GET /api/carros

GET /api/carros

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|x-access-token|header|string| yes |none|

> Response Examples

> 403

```json
{
  "status": "Forbidden",
  "message": "Token não fornecido."
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|403|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» message|string|true|none||none|

## GET /api/carros/{id}

GET /api/carros/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| yes |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

## POST /api/carros/criar

POST /api/carros/criar

> Body Parameters

```json
{
  "marca": "string",
  "modelo": "string",
  "ano": 0,
  "placa": "string",
  "capacidade_de_passageiros": 0
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|x-access-token|header|string| yes |none|
|body|body|object| no |none|
|» marca|body|string| yes |none|
|» modelo|body|string| yes |none|
|» ano|body|integer| yes |none|
|» placa|body|string| yes |none|
|» capacidade_de_passageiros|body|integer| yes |none|

> Response Examples

> 403

```json
{
  "status": "Forbidden",
  "message": "Token não fornecido."
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|403|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» message|string|true|none||none|

## PUT /api/carros/alterar/{id}

PUT /api/carros/alterar/{id}

> Body Parameters

```json
{
  "marca": "string",
  "modelo": "string",
  "ano": 0,
  "placa": "string",
  "capacidade_de_passageiros": 0
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| yes |none|
|body|body|object| no |none|
|» marca|body|string| yes |none|
|» modelo|body|string| yes |none|
|» ano|body|integer| yes |none|
|» placa|body|string| yes |none|
|» capacidade_de_passageiros|body|integer| yes |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

## DELETE /api/carros/deletar/{id}

DELETE /api/carros/deletar/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| yes |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

# Agendamentos

## GET /api/agendamentos/

GET /api/agendamentos/

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|x-access-token|header|string| yes |none|

> Response Examples

> 403

```json
{
  "status": "Forbidden",
  "message": "Token não fornecido."
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|403|Inline|

### Responses Data Schema

HTTP Status Code **403**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» status|string|true|none||none|
|» message|string|true|none||none|

## GET /api/agendamentos/{id}

GET /api/agendamentos/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| no |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

## POST /api/agendamentos/criar

POST /api/agendamentos/criar

> Body Parameters

```json
{
  "aluno_id": "string",
  "carro_id": "string",
  "data_aula": "string",
  "horario_aula": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|x-access-token|header|string| no |none|
|body|body|object| no |none|
|» aluno_id|body|string| yes |none|
|» carro_id|body|string| yes |none|
|» data_aula|body|string| yes |none|
|» horario_aula|body|string| yes |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

## PUT /api/agendamentos/alterar/{id}

PUT /api/agendamentos/alterar/{id}

> Body Parameters

```json
{
  "aluno_id": "string",
  "carro_id": "string",
  "data_aula": "string",
  "horario_aula": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| no |none|
|body|body|object| no |none|
|» aluno_id|body|string| yes |none|
|» carro_id|body|string| yes |none|
|» data_aula|body|string| yes |none|
|» horario_aula|body|string| yes |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

## DELETE /api/agendamentos/deletar/{id}

DELETE /api/agendamentos/deletar/{id}

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|id|path|string| yes |none|
|x-access-token|header|string| no |none|

> Response Examples

> 0

```json
null
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|0|Unknown|0|Inline|

### Responses Data Schema

# Auth

## POST /api/login

POST /api/login

> Body Parameters

```json
{
  "user": "string",
  "password": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» user|body|string| yes |none|
|» password|body|string| yes |none|

> Response Examples

> Success

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsIm5pdmVsX3Blcm1pc3NhbyI6MCwiaWF0IjoxNzAxMDE2MTMzLCJleHAiOjE3MDEwMTk3MzN9.-3yzBSETiuHP2MrnTXrSP3-ASyUdXUfWZ12NM5paQLg",
  "usuario": {
    "id": 1,
    "username": "admin",
    "password": "admin",
    "nivel_perm": 0
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» auth|boolean|true|none||none|
|» token|string|true|none||none|
|» usuario|object|true|none||none|
|»» id|integer|true|none||none|
|»» username|string|true|none||none|
|»» password|string|true|none||none|
|»» nivel_perm|integer|true|none||none|

# Data Schema

