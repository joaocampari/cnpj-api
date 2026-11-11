# cnpj-api

API que valida CNPJ e consulta dados cadastrais na BrasilAPI. Usada pelo cadastro de vendedores.

## Stack
- Node.js 20+ com ES Modules (`import`/`export`)
- Express 4
- Testes: Vitest + Supertest
- Sem banco de dados

## Comandos
- `npm install`: instala as dependências
- `npm run dev`: sobe a API em http://localhost:3000
- `npm test`: roda todos os testes

## Estrutura
- `src/cnpj/validator.js`: regras de CNPJ (normalização, dígitos verificadores, formatação)
- `src/cnpj/brasilapi.js`: única integração externa (BrasilAPI)
- `src/routes/cnpj.js`: rotas HTTP; só orquestra, sem regra de negócio
- `test/`: um arquivo de teste por módulo
- `docs/contexto/`: reuniões, conversas com produto e documentação de regras

## Padrões
- Funções e variáveis em português, como no código atual
- Erros respondem `{ "error": "mensagem em português" }` com status adequado: 400 entrada inválida, 404 não encontrado, 422 regra de negócio, 502 falha externa
- Testes nunca chamam a BrasilAPI de verdade: mocke `src/cnpj/brasilapi.js`

## Regras para o agente
- Responda em português do Brasil
- Antes de editar mais de um arquivo, mostre o plano e espere aprovação
- Não adicione dependências sem perguntar
- Não crie camadas, classes ou padrões que a tarefa não pediu
- Regras de negócio vêm dos documentos em `docs/contexto/`. Se dois documentos se contradizem, vale o mais recente, e você deve apontar a contradição
- Nunca invente regra fiscal. Se não estiver no contexto, pergunte
- Ao terminar uma alteração, rode `npm test` e mostre o resultado
