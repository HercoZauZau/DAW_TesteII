import Avaliacao from '../models/Avaliacao';

class AvaliacaoController {
  async index(req, res) {
    try {
      const avaliacao = await Avaliacao.findAll({
        attributes: ['id', 'user_id', 'rest_id', 'nota', 'comentario', 'estado'],
        order: [['id', 'DESC']],
      });
      return res.json(avaliacao);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro de conexao'],
      });
    }
  }

  async store(req, res) {
    try {
      console.log(req.body);

      const avaliacao = await Avaliacao.create(req.body);

      return res.json(avaliacao);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID necessário'],
        });
      }

      const avaliacao = await Avaliacao.findByPk(id, {
        // attributes: ['id', 'user_id', 'rest_id', 'nota', 'comentario', 'estado'],
        order: [['id', 'DESC']],
      });

      if (!avaliacao) {
        return res.status(404).json({
          errors: ['Nenhuma avaliacao com essa ID.'],
        });
      }

      return res.json(avaliacao);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID necessário'],
        });
      }

      const avaliacao = await Avaliacao.findByPk(id);

      if (!avaliacao) {
        return res.status(400).json({
          errors: ['Nenhuma avaliacao com essa ID.'],
        });
      }

      console.log(req.body);
      const avaliacaoAtualizado = await avaliacao.update(req.body);

      return res.json(avaliacaoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID necessário'],
        });
      }

      const avaliacao = await Avaliacao.findByPk(id);

      if (!avaliacao) {
        return res.status(400).json({
          errors: ['Nenhuma avaliacao com essa ID.'],
        });
      }

      await avaliacao.destroy();

      return res.json(`'${avaliacao.id}' apagada.`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AvaliacaoController();
