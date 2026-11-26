import { describe, it, expect } from 'vitest';
import { validarCNPJ, normalizar } from '../src/cnpj/validator.js';

describe('validarCNPJ (numérico)', () => {
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

  it('rejeita tamanho diferente de 14', () => {
    const resultado = validarCNPJ('1122233300018');
    expect(resultado.valido).toBe(false);
    expect(resultado.motivo).toBe('O CNPJ deve ter 14 caracteres.');
  });

  it('aceita o CNPJ alfanumérico oficial', () => {
    const resultado = validarCNPJ('12.ABC.345/01DE-35');
    expect(resultado.valido).toBe(true);
    expect(resultado.tipo).toBe('alfanumerico');
  });

  it('normaliza letras minúsculas do CNPJ alfanumérico', () => {
    const resultado = validarCNPJ('12.abc.345/01de-35');
    expect(resultado.valido).toBe(true);
    expect(resultado.cnpj).toBe('12ABC34501DE35');
  });

  it('rejeita letras nos dígitos verificadores', () => {
    expect(validarCNPJ('12.ABC.345/01DE-A5').valido).toBe(false);
  });

  it('rejeita acentos e outros caracteres inválidos', () => {
    expect(validarCNPJ('12.ABÇ.345/01DE-35').valido).toBe(false);
  });

  it('rejeita dígitos verificadores alfanuméricos incorretos', () => {
    expect(validarCNPJ('12.ABC.345/01DE-34').valido).toBe(false);
  });
});

describe('normalizar', () => {
  it('remove pontos, barra, hífen e espaços', () => {
    expect(normalizar(' 11.222.333/0001-81 ')).toBe('11222333000181');
  });

  it('converte letras para maiúsculas', () => {
    expect(normalizar('12.abc.345/01de-35')).toBe('12ABC34501DE35');
  });
});
