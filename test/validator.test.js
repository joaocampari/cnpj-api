import { describe, it, expect } from 'vitest';
import { validarCNPJ, normalizar } from '../src/cnpj/validator.js';

describe('validarCNPJ (numérico)', () => {
  it('aceita um CNPJ numérico válido sem máscara', () => {
    expect(validarCNPJ('11222333000181')).toEqual({
      valido: true,
      cnpj: '11222333000181',
      formatado: '11.222.333/0001-81',
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
    expect(validarCNPJ('1122233300018').valido).toBe(false);
  });

  it('rejeita letras (ainda não suportamos o formato alfanumérico)', () => {
    expect(validarCNPJ('12ABC34501DE35').valido).toBe(false);
  });
});

describe('normalizar', () => {
  it('remove pontos, barra, hífen e espaços', () => {
    expect(normalizar(' 11.222.333/0001-81 ')).toBe('11222333000181');
  });
});
