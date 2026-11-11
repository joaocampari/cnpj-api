# Transcrição — Refinamento: CNPJ alfanumérico

> Reunião FICTÍCIA, criada para a live. Empresa, pessoas e números são inventados.

**Data:** 10/11/2026 · **Duração:** 32 min
**Participantes:** Mariana (PM), João (Tech Lead), Rafael (Dev), Beatriz (QA)

---

**Mariana:** Bom, pessoal, vou direto. Desde julho a Receita começou a emitir CNPJ com letra. Ontem o suporte abriu três chamados de vendedor novo que não consegue se cadastrar porque a nossa API diz que o CNPJ é inválido.

**João:** É, a nossa validação só aceita número. A regex é catorze dígitos e acabou.

**Rafael:** Mas muda muito? Achei que era só aceitar letra.

**João:** Muda o cálculo do dígito verificador. Os pesos continuam os mesmos, mas cada caractere vira um valor, o código ASCII menos 48. Número continua valendo ele mesmo, e a letra A vale 17. Os dois últimos continuam sendo número. Eu coloquei o resumo da Receita na pasta de docs.

**Beatriz:** E os CNPJs antigos?

**João:** Não mudam. Os numéricos continuam existindo e convivendo com os novos. A gente tem que aceitar os dois.

**Mariana:** Tá. Então o mínimo pra mim é: o vendedor com CNPJ alfanumérico consegue passar na validação.

**Beatriz:** E se ele digitar com letra minúscula? Vai ter gente colando "12.abc.345/01de-35".

**João:** Normaliza pra maiúscula. Formalmente o CNPJ é em maiúscula, mas não vamos punir o usuário por isso.

**Mariana:** Concordo.

**Beatriz:** A Receita não bloqueia algumas combinações de letras? Tipo palavrão?

**João:** Bloqueia na emissão, mas não publica a lista. A gente aceita de A a Z e quem garante que não existe combinação proibida é a Receita. Não vamos tentar replicar regra que não é nossa.

**Rafael:** E a consulta? A rota que busca razão social na BrasilAPI.

**João:** Boa pergunta. Não sei se a BrasilAPI já responde CNPJ com letra.

**Mariana:** Por enquanto, se for alfanumérico, a consulta devolve 404 e a gente vê depois.

**Rafael:** Fechado. Mais alguma coisa?

**Mariana:** Ah, falando nisso, alguém viu o resultado do jogo ontem?

**Rafael:** Nem me fala.

**Mariana:** Tá, voltando. Prazo: eu queria isso em produção antes do fechamento do mês, porque o time de onboarding vai começar campanha pra vendedor novo.

**João:** Dá. É uma mudança pequena se a gente não inventar moda. Sem front, sem banco, só a API.

**Beatriz:** Eu quero teste com um CNPJ alfanumérico de exemplo oficial, não um inventado pela gente.

**João:** Tem um exemplo no material da Receita, eu ponho na issue.

**Mariana:** Perfeito. Rafael, você puxa?

**Rafael:** Puxo.

*[fim da transcrição]*
