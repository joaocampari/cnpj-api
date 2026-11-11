---
name: revisao-codigo
description: Revisa o diff da branch atual antes de abrir um Pull Request. Use quando pedirem review, revisão de código ou "posso abrir o PR?".
---
# Revisão de código antes do PR

1. Rode `git diff main...HEAD --stat` e depois `git diff main...HEAD` para ver o que mudou.
2. Rode `npm test` e anote o resultado.
3. Para cada arquivo alterado, verifique:
   - Faz só o que a issue pede? Algo foi criado "por precaução"?
   - Erros tratados com o status certo (400, 404, 422, 502) e mensagem útil?
   - Algum segredo, chave ou dado pessoal no código ou em log?
   - Alguma regra inventada que não está em docs/contexto/? Algum TODO esquecido?
   - Os testes quebrariam se a lógica principal fosse removida?
   - Nomes e organização seguem o copilot-instructions.md?
4. Responda com:
   - Uma tabela: arquivo | risco (alto, médio, baixo) | o que mudar
   - Um veredito: "pronto para PR" ou "ajustar antes"
   - No máximo 5 itens. Não reescreva o código; aponte.
