# API Escola de Idiomas

API REST em Node.js (Express, nodemon, morgan, body-parser, CORS, mysql) com o recurso **estudante** (`id`, `nome`, `idioma`, `nivel`).

## Como executar

1. Tenha Node.js e MySQL/MariaDB instalados.
2. Execute o script `database/script.sql` no banco (cria o banco `escola_idiomas`, a tabela e dados de exemplo).
3. Ajuste a conexão em `config/db.js` (padrão: `localhost`, usuário `root`, senha vazia) ou use as variáveis de ambiente `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
4. Instale as dependências e inicie:

```
npm install
npm start
```

Servidor em `http://localhost:3000`.

## Rotas

| Método | Rota             | Descrição      |
|--------|------------------|----------------|
| GET    | /estudante       | Lista todos    |
| GET    | /estudante/:id   | Busca por id   |
| POST   | /estudante       | Cria           |
| PUT    | /estudante/:id   | Atualiza       |
| DELETE | /estudante/:id   | Remove         |

Corpo (JSON) para POST/PUT:

```json
{ "nome": "Gabriel da Costa", "idioma": "Inglês", "nivel": "Básico" }
```

