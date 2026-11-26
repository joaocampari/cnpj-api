import { describe, it, expect } from 'vitest';
import { validarCNPJ, normalizar } from '../src/cnpj/validator.js';

describe('validarCNPJ', () => {
  it('aceita um CNPJ numérico válido sem máscara', () => {
    expect(validarCNPJ('11222333000181')).toEqual({
      valido: true,
      cnpj: '11222333000181',
      formatado: '11.222.333/0001-81',
      tipo: 'numerico',
    });
  });

  it('aceita um CNPJ numérico válido com máscara', () => {
    expect(validarCNPJ('11.222.333/0001-81').valido).toBe(true);
  });

  it('rejeita quando os dígitos verificadores não conferem', () => {
    const resultado = validarCNPJ('11222333000182');
    expect(resultado.valido).toBe(false);
    expect(resultado.motivo).toMatch(/verificadores/);
  });

  it('rejeita CNPJ com todos os dígitos iguais', () => {
    expect(validarCNPJ('00000000000000').valido).toBe(false);
  });

  it('rejeita tamanho diferente de 14 com a mensagem atualizada', () => {
    const resultado = validarCNPJ('1122233300018');
    expect(resultado.valido).toBe(false);
    expect(resultado.motivo).toBe('O CNPJ deve ter 14 caracteres.');
  });

  it('rejeita acentos e símbolos em todas as posições permitidas', () => {
    expect(validarCNPJ('12.AÇC.345/01DE-35').valido).toBe(false);
  });

  it('aceita o CNPJ alfanumérico oficial normalizando letras minúsculas', () => {
    expect(validarCNPJ('12.abc.345/01de-35')).toEqual({
      valido: true,
      cnpj: '12ABC34501DE35',
      formatado: '12.ABC.345/01DE-35',
      tipo: 'alfanumerico',
    });
  });

  it('rejeita CNPJ com letra nas posições dos dígitos verificadores', () => {
    expect(validarCNPJ('12ABC34501DA35').valido).toBe(false);
  });

  it('rejeita CNPJ alfanumérico com dígito verificador incorreto', () => {
    expect(validarCNPJ('12ABC34501DE36').valido).toBe(false);
  });

  it('retorna a mensagem de 14 caracteres para tamanho inválido', () => {
    expect(validarCNPJ('12ABC34501DE3').motivo).toBe('O CNPJ deve ter 14 caracteres.');
  });
});

describe('normalizar', () => {
  it('remove pontos, barra, hífen e espaços e converte letras para maiúsculas', () => {
    expect(normalizar(' 12.abc.345/01de-35 ')).toBe('12ABC34501DE35');
  });
});
