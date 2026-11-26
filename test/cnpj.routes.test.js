import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../src/cnpj/brasilapi.js', async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, consultarCNPJ: vi.fn() };
});

const { app } = await import('../src/app.js');
const { consultarCNPJ, CnpjNaoEncontradoError, ServicoExternoError } = await import('../src/cnpj/brasilapi.js');

beforeEach(() => {
  vi.mocked(consultarCNPJ).mockReset();
});

describe('GET /cnpj/:cnpj/validacao', () => {
  it('retorna 200 com o CNPJ formatado quando é válido', async () => {
    const res = await request(app).get('/cnpj/11222333000181/validacao');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cnpj: '11222333000181', formatado: '11.222.333/0001-81', valido: true, tipo: 'numerico' });
  });

  it('retorna 200 com tipo alfanumerico para o exemplo oficial', async () => {
    const res = await request(app).get('/cnpj/12.ABC.345%2F01DE-35/validacao');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cnpj: '12ABC34501DE35', formatado: '12.ABC.345/01DE-35', valido: true, tipo: 'alfanumerico' });
  });

  it('normaliza letras minusculas na validacao alfanumerica', async () => {
    const res = await request(app).get('/cnpj/12.abc.345%2F01de-35/validacao');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ cnpj: '12ABC34501DE35', formatado: '12.ABC.345/01DE-35', valido: true, tipo: 'alfanumerico' });
  });

  it('retorna 400 com a mensagem de caracteres para entrada curta', async () => {
    const res = await request(app).get('/cnpj/12ABC34501DE3/validacao');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'O CNPJ deve ter 14 caracteres.' });
  });

  it('retorna 400 com mensagem quando é inválido', async () => {
    const res = await request(app).get('/cnpj/11222333000182/validacao');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/verificadores/);
  });
});

describe('GET /cnpj/:cnpj', () => {
  it('retorna os dados da BrasilAPI quando o CNPJ é válido', async () => {
    vi.mocked(consultarCNPJ).mockResolvedValue({ cnpj: '11222333000181', razaoSocial: 'EMPRESA TESTE LTDA' });
    const res = await request(app).get('/cnpj/11222333000181');
    expect(res.status).toBe(200);
    expect(res.body.razaoSocial).toBe('EMPRESA TESTE LTDA');
    expect(consultarCNPJ).toHaveBeenCalledWith('11222333000181');
  });

  it('não chama a BrasilAPI quando o CNPJ é inválido', async () => {
    const res = await request(app).get('/cnpj/123');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'O CNPJ deve ter 14 caracteres.' });
    expect(consultarCNPJ).not.toHaveBeenCalled();
  });

  it('retorna 422 sem consultar a BrasilAPI para CNPJ alfanumerico', async () => {
    const res = await request(app).get('/cnpj/12.ABC.345%2F01DE-35');
    expect(res.status).toBe(422);
    expect(res.body).toEqual({ error: 'Consulta de dados ainda não disponível para CNPJ alfanumérico.' });
    expect(consultarCNPJ).not.toHaveBeenCalled();
  });

  it('retorna 404 quando a BrasilAPI não encontra o CNPJ', async () => {
    vi.mocked(consultarCNPJ).mockImplementation(async () => {
      throw new CnpjNaoEncontradoError('não encontrado');
    });
    const res = await request(app).get('/cnpj/11222333000181');
    expect(res.status).toBe(404);
  });

  it('retorna 502 quando a BrasilAPI falha', async () => {
    vi.mocked(consultarCNPJ).mockImplementation(async () => {
      throw new ServicoExternoError('fora do ar');
    });
    const res = await request(app).get('/cnpj/11222333000181');
    expect(res.status).toBe(502);
    expect(res.body.error).toMatch(/Tente novamente/);
  });
});
