---
agent: agent
description: Transforma reunião, conversas com produto e documentação em uma issue pronta para desenvolvimento.
---
Leia todos os arquivos em `docs/contexto/` e escreva a issue desta demanda: ${input:demanda:ex. suportar CNPJ alfanumérico}

Use este formato:

## Descrição
Uma frase do ponto de vista de quem usa.

## Contexto
2 a 3 linhas: por que agora, de onde vem a regra.

## Critérios de aceite
Lista numerada. Embaixo de cada critério, os casos de teste (entrada → resultado esperado).

## Fora do escopo

## Decisões e conflitos encontrados
Se dois documentos se contradizem, diga qual vale (o mais recente) e cite os dois.

## Perguntas em aberto
Só o que os documentos não respondem.

Regras: não invente nada que não esteja nos documentos. Me mostre a issue antes de criar no GitHub. Depois do meu ok, crie a issue no repositório ${input:repo:owner/cnpj-api} usando o MCP do GitHub.
