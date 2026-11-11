// Validação de CNPJ (formato numérico tradicional).
// Regra do dígito verificador: módulo 11 com pesos 5..2,9..2 (DV1) e 6..2,9..2 (DV2).

const PESOS_DV1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_DV2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function normalizar(entrada) {
  return String(entrada ?? '').replace(/[.\/\-\s]/g, '');
}

function calcularDigito(valores, pesos) {
  const soma = valores.reduce((acc, valor, i) => acc + valor * pesos[i], 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function calcularDigitosVerificadores(base12) {
  const valores = base12.split('').map((c) => Number.parseInt(c, 10));
  const dv1 = calcularDigito(valores, PESOS_DV1);
  const dv2 = calcularDigito([...valores, dv1], PESOS_DV2);
  return `${dv1}${dv2}`;
}

export function formatar(cnpj) {
  return cnpj.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5');
}

export function validarCNPJ(entrada) {
  const cnpj = normalizar(entrada);

  if (!/^\d{14}$/.test(cnpj)) {
    return { valido: false, cnpj, motivo: 'O CNPJ deve ter 14 dígitos.' };
  }
  if (/^(\d)\1{13}$/.test(cnpj)) {
    return { valido: false, cnpj, motivo: 'CNPJ com todos os dígitos iguais não é válido.' };
  }

  const esperado = calcularDigitosVerificadores(cnpj.slice(0, 12));
  if (cnpj.slice(12) !== esperado) {
    return { valido: false, cnpj, motivo: 'Dígitos verificadores não conferem.' };
  }

  return { valido: true, cnpj, formatado: formatar(cnpj) };
}
