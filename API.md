# 🌐 PAB - API Documentation (Viagens)

## 🔐 Base do projeto

O sistema utiliza Supabase como backend principal, com chamadas HTTP via Axios.

---

## 🔑 Autenticação

Autenticação feita via Supabase Auth.

Headers padrão das requisições:

Authorization: Bearer <token>
Content-Type: application/json

---

## 👤 Usuário

### Obter usuário logado
GET /user

Response:
{
  "id": "string",
  "name": "string",
  "email": "string"
}

---

## 🚌 Viagens

### Listar viagens
GET /viagens

Response:
[
  {
    "id": 1,
    "origem": "Recife",
    "destino": "Campina Grande",
    "data_saida": "2026-05-28",
    "status": "programada"
  }
]

---

### Criar viagem
POST /viagens

Body:
{
  "origem": "Recife",
  "destino": "Campina Grande",
  "data_saida": "2026-05-28"
}

Response:
{
  "message": "Viagem criada com sucesso"
}

---

## 👥 Passageiros

### Listar passageiros
GET /passageiros

Response:
[
  {
    "id": 1,
    "nome": "João",
    "viagem_id": 1
  }
]

---

### Criar passageiro
POST /passageiros

Body:
{
  "nome": "João",
  "viagem_id": 1
}

---

## 👤 Perfil

### Obter perfil do usuário
GET /profile

Response:
{
  "id": "string",
  "nome": "string",
  "cargo": "operador"
}

---

## ⚠️ Erros comuns

- 400 → Requisição inválida
- 401 → Não autenticado
- 403 → Sem permissão
- 500 → Erro interno do servidor

---

## 🧠 Observações técnicas

- Todas as requisições passam por instância Axios centralizada
- Token é injetado automaticamente via interceptor
- Datas são tratadas com `date-fns` antes de exibição
- Estado global gerenciado via Zustand