import { describe, it, expect } from 'vitest';
import { validarCNPJ, normalizar } from '../src/cnpj/validator.js';

describe('validarCNPJ (numérico e alfanumérico)', () => {
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

  it('aceita um CNPJ alfanumérico válido com exemplo da Receita', () => {
    expect(validarCNPJ('12.ABC.345/01DE-35')).toEqual({
      valido: true,
      cnpj: '12ABC34501DE35',
      formatado: '12.ABC.345/01DE-35',
      tipo: 'alfanumerico',
    });
  });

  it('normaliza letras minúsculas antes de validar envia o CNPJ como maiúsculas', () => {
    const resultado = validarCNPJ('12.abc.345/01de-35');
    expect(resultado.valido).toBe(true);
    expect(resultado.cnpj).toBe('12ABC34501DE35');
    expect(resultado.formatado).toBe('12.ABC.345/01DE-35');
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
    expect(validarCNPJ('1122233300018').valido).toBe(false);
  });

  it('rejeita letra nas posições 13 e 14', () => {
    expect(validarCNPJ('12ABC34501DE3A').valido).toBe(false);
  });

  it('rejeita caractere inválido para o formato do CNPJ', () => {
    expect(validarCNPJ('12.ÇBC.345/01DE-35').valido).toBe(false);
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
