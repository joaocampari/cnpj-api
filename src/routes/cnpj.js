import { Router } from 'express';
import { validarCNPJ } from '../cnpj/validator.js';
import { consultarCNPJ, CnpjNaoEncontradoError } from '../cnpj/brasilapi.js';

export const cnpjRouter = Router();

// GET /cnpj/:cnpj/validacao — só valida o formato e os dígitos verificadores
cnpjRouter.get('/:cnpj/validacao', (req, res) => {
  const resultado = validarCNPJ(req.params.cnpj);
  if (!resultado.valido) {
    return res.status(400).json({ error: resultado.motivo });
  }
  return res.json({ cnpj: resultado.cnpj, formatado: resultado.formatado, tipo: resultado.tipo, valido: true });
});

// GET /cnpj/:cnpj — valida e consulta os dados cadastrais
cnpjRouter.get('/:cnpj', async (req, res) => {
  const resultado = validarCNPJ(req.params.cnpj);
  if (!resultado.valido) {
    return res.status(400).json({ error: resultado.motivo });
  }

  if (resultado.tipo === 'alfanumerico') {
    return res.status(422).json({ error: 'Consulta de dados ainda não disponível para CNPJ alfanumérico.' });
  }

  try {
    const dados = await consultarCNPJ(resultado.cnpj);
    return res.json(dados);
  } catch (erro) {
    if (erro instanceof CnpjNaoEncontradoError) {
      return res.status(404).json({ error: 'CNPJ não encontrado.' });
    }
    return res.status(502).json({ error: 'Não foi possível consultar o CNPJ agora. Tente novamente.' });
  }
});
