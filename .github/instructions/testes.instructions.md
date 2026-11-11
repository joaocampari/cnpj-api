---
applyTo: "**/*.test.js"
---
# Regras para testes

- Nomes de teste em português, descrevendo o comportamento ("rejeita letra nas posições 13 e 14")
- Cada critério de aceite da issue vira pelo menos um teste
- Use exemplos oficiais quando existirem (ver `docs/contexto/03-receita-cnpj-alfanumerico.md`); não invente CNPJ "válido" sem conferir o cálculo
- Teste os caminhos de erro, não só o caminho feliz
- Nos testes de rota, verifique o status E o corpo da resposta
- Mocke `src/cnpj/brasilapi.js`; nenhum teste chama a internet
- Em `beforeEach`, use chaves: `beforeEach(() => { ... })`. Uma arrow function sem chaves devolve o mock, e o Vitest executa o que o hook retorna como limpeza depois do teste
