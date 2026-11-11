# cnpj-api

API de exemplo da live **IA no dia a dia do dev** (FIAP 2TDS). Valida CNPJ e consulta dados cadastrais na [BrasilAPI](https://brasilapi.com.br).

## Rodando
```bash
npm install
npm run dev   # http://localhost:3000
npm test
```

## Rotas
| Rota | O que faz |
|---|---|
| `GET /cnpj/:cnpj/validacao` | Valida formato e dígitos verificadores |
| `GET /cnpj/:cnpj` | Valida e consulta os dados na BrasilAPI |

Exemplos prontos em `requests.http` (extensão REST Client do VS Code) ou:
```bash
curl http://localhost:3000/cnpj/11.222.333%2F0001-81/validacao
```

## Contexto para a IA
- `.github/copilot-instructions.md`: regras do projeto, sempre no contexto
- `.github/instructions/`, `.github/prompts/`, `.github/agents/`, `.github/skills/`: customizações do Copilot
- `.vscode/mcp.json`: servidores MCP (GitHub e Context7)
- `docs/contexto/`: reunião, chat com produto e regra da Receita usados para a feature do CNPJ alfanumérico (material fictício, exceto a regra)
