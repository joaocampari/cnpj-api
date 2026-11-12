// Validação de CNPJ (numérico e alfanumérico).
// Regra do dígito verificador: módulo 11 com pesos 5..2,9..2 (DV1) e 6..2,9..2 (DV2),
// aplicados aos valores ASCII dos 12 primeiros caracteres (A = 17, ..., Z = 42).

const PESOS_DV1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_DV2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function normalizar(entrada) {
  return String(entrada ?? '').replace(/[.\/\-\s]/g, '').toUpperCase();
}

function valorDoCaracter(caractere) {
  const codigoAscii = caractere.charCodeAt(0);
  const ehDigito = codigoAscii >= 48 && codigoAscii <= 57;
  const ehLetra = codigoAscii >= 65 && codigoAscii <= 90;

  if (ehDigito) return codigoAscii - 48;
  if (ehLetra) return codigoAscii - 48;

  return Number.NaN;
}

function calcularDigito(valores, pesos) {
  const soma = valores.reduce((acc, valor, i) => acc + valor * pesos[i], 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function calcularDigitosVerificadores(base12) {
  const valores = base12.split('').map((caractere) => {
    const valor = valorDoCaracter(caractere);
    if (Number.isNaN(valor)) {
      throw new Error(`Caractere inválido para CNPJ: ${caractere}`);
    }
    return valor;
  });

  const dv1 = calcularDigito(valores, PESOS_DV1);
  const dv2 = calcularDigito([...valores, dv1], PESOS_DV2);
  return `${dv1}${dv2}`;
}

export function formatar(cnpj) {
  return cnpj.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5');
}

export function validarCNPJ(entrada) {
  const cnpj = normalizar(entrada);

  if (!/^[A-Z0-9]{14}$/.test(cnpj) || !/^\d{2}$/.test(cnpj.slice(12))) {
    return { valido: false, cnpj, motivo: 'O CNPJ deve ter 14 caracteres.' };
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return { valido: false, cnpj, motivo: 'CNPJ com todos os dígitos iguais não é válido.' };
  }

  const base12 = cnpj.slice(0, 12);
  const esperado = calcularDigitosVerificadores(base12);
  if (cnpj.slice(12) !== esperado) {
    return { valido: false, cnpj, motivo: 'Dígitos verificadores não conferem.' };
  }

  const tipo = /^[0-9]+$/.test(base12) ? 'numerico' : 'alfanumerico';

  return { valido: true, cnpj, formatado: formatar(cnpj), tipo };
}
