# Chat #squad-cadastro — thread sobre CNPJ alfanumérico

> Conversa FICTÍCIA, criada para a live.

**Mariana (PM)** — 10/11, 16:42
Pessoal, duas coisas depois da reunião:

1. Conversei com o time de atendimento e a gente NÃO vai devolver 404 na consulta de CNPJ alfanumérico. 404 dá a entender que o CNPJ não existe, e o vendedor vai achar que errou. Quero **422** com a mensagem: "Consulta de dados ainda não disponível para CNPJ alfanumérico."

2. O time de dados pediu pra gente devolver na validação um campo `tipo` com `numerico` ou `alfanumerico`, pra acompanhar quantos cadastros novos vêm no formato novo.

**João (Tech Lead)** — 10/11, 16:50
Faz sentido. A validação com sucesso continua 200 e ganha o `tipo`. E o 422 só na rota de consulta, certo? A rota de validação continua respondendo normal pra alfanumérico.

**Mariana (PM)** — 10/11, 16:51
Isso. Validação: aceita os dois. Consulta: só numérico por enquanto.

**Rafael (Dev)** — 10/11, 17:05
E a mensagem de erro de validação? Hoje está "O CNPJ deve ter 14 dígitos."

**Mariana (PM)** — 10/11, 17:07
Troca pra "O CNPJ deve ter 14 caracteres." Com letra não são mais só dígitos.

**Beatriz (QA)** — 10/11, 17:20
👍 vou montar os cenários com base nisso.
