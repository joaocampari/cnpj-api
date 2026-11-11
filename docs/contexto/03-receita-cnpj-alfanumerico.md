# CNPJ alfanumérico — resumo técnico da regra

> Resumo preparado pelo time a partir do material público da Receita Federal (Instrução Normativa RFB nº 2.229/2024 e página "CNPJ Alfanumérico" no gov.br). Sempre confira a fonte oficial antes de usar em produção.

## Contexto
- A Receita Federal passou a emitir CNPJ alfanumérico a partir de 31/07/2026, para novas inscrições.
- **CNPJs já existentes não mudam.** Numéricos e alfanuméricos são aceitos ao mesmo tempo.
- O CNPJ continua com **14 caracteres** e a mesma máscara: `00.000.000/0000-00`.

## Formato
| Posições | Conteúdo | Caracteres aceitos |
|---|---|---|
| 1–8 | Raiz | `0–9` e `A–Z` (maiúsculas) |
| 9–12 | Ordem (filial) | `0–9` e `A–Z` (maiúsculas) |
| 13–14 | Dígitos verificadores | somente `0–9` |

## Cálculo dos dígitos verificadores
1. Converta cada um dos 12 primeiros caracteres em valor: **código ASCII do caractere menos 48**.
   - Dígitos mantêm o próprio valor (`'0'` = 0 … `'9'` = 9).
   - Letras: `A` = 17, `B` = 18, … `Z` = 42.
2. **DV1:** multiplique os 12 valores pelos pesos `5 4 3 2 9 8 7 6 5 4 3 2` e some.
3. **DV2:** use os 12 valores + o DV1 (13 posições) com os pesos `6 5 4 3 2 9 8 7 6 5 4 3 2` e some.
4. Para cada soma: resto = soma mod 11. Se o resto for 0 ou 1, o dígito é **0**; senão, é **11 − resto**.

Para CNPJs só com números o resultado é idêntico ao cálculo antigo.

## Exemplo (material de referência da Receita)
CNPJ: `12.ABC.345/01DE-35`

| Caractere | 1 | 2 | A | B | C | 3 | 4 | 5 | 0 | 1 | D | E |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Valor | 1 | 2 | 17 | 18 | 19 | 3 | 4 | 5 | 0 | 1 | 20 | 21 |

- DV1: soma = 459 → 459 mod 11 = 8 → 11 − 8 = **3**
- DV2: soma = 424 → 424 mod 11 = 6 → 11 − 6 = **5**

## O que NÃO é válido
- Letras minúsculas, acentos, `Ç` ou outros símbolos (normalize a entrada antes de validar)
- Letras nas posições 13 e 14

## Observação
A Receita impede algumas combinações de letras na emissão, mas não publica a lista. Validadores devem aceitar de A a Z.
