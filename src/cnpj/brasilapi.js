// Consulta de dados cadastrais na BrasilAPI (pública, sem chave).
// Docs: https://brasilapi.com.br/docs#tag/CNPJ

const BASE_URL = process.env.BRASILAPI_URL ?? 'https://brasilapi.com.br/api/cnpj/v1';

export class CnpjNaoEncontradoError extends Error {}
export class ServicoExternoError extends Error {}

export async function consultarCNPJ(cnpj) {
  let resposta;
  try {
    resposta = await fetch(`${BASE_URL}/${cnpj}`, { signal: AbortSignal.timeout(5000) });
  } catch (erro) {
    throw new ServicoExternoError('Falha ao acessar a BrasilAPI', { cause: erro });
  }

  if (resposta.status === 404) throw new CnpjNaoEncontradoError('CNPJ não encontrado');
  if (!resposta.ok) throw new ServicoExternoError(`BrasilAPI respondeu ${resposta.status}`);

  const dados = await resposta.json();
  return {
    cnpj: dados.cnpj,
    razaoSocial: dados.razao_social,
    nomeFantasia: dados.nome_fantasia || null,
    situacao: dados.descricao_situacao_cadastral,
    municipio: dados.municipio,
    uf: dados.uf,
  };
}
