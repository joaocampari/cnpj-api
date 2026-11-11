---
agent: agent
description: Abre o Pull Request da branch atual com uma descrição pronta para review.
---
Abra um Pull Request da branch atual para a main usando o MCP do GitHub.

Issue relacionada: ${input:issue:número da issue}

Antes de abrir, me mostre o texto e espere meu ok. Use este formato:

## O que muda
2 a 4 linhas, do ponto de vista de quem usa.

## Como testar
Passos com curl ou com o arquivo `requests.http`.

## Critérios de aceite
Checklist com os critérios da issue, marcando o que foi atendido.

## Pontos de atenção para o review
O que você revisaria com mais cuidado.

Na última linha: `Closes #<número da issue>`.
