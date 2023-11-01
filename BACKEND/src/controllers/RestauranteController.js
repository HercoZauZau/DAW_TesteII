import Restaurante from '../models/Restaurante';
import FotoR from '../models/FotoR';

class RestauranteController {
  async index(req, res) {
    try {
      const restaurante = await Restaurante.findAll({
        // attributes: ['id', 'nome'],
        order: [['id', 'DESC'], [FotoR, 'id', 'DESC']],
        include: {
          model: FotoR,
          attributes: ['filename', 'url'],
        },
      });
      return res.json(restaurante);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro de conexao'],
      });
    }
  }

  async store(req, res) {
    try {
      const restaurante = await Restaurante.create(req.body);

      return res.json(restaurante);
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

      const restaurante = await Restaurante.findByPk(id, {
        // attributes: ['id', 'nome'],
        order: [['id', 'DESC'], [FotoR, 'id', 'DESC']],
        include: {
          model: FotoR,
          attributes: ['url', 'filename'],
        },
      });

      if (!restaurante) {
        return res.status(404).json({
          errors: ['Nenhum restaurante com essa ID.'],
        });
      }

      return res.json(restaurante);
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

      const restaurante = await Restaurante.findByPk(id);

      if (!restaurante) {
        return res.status(400).json({
          errors: ['Nenhum restaurante com essa ID.'],
        });
      }

      const restauranteAtualizado = await restaurante.update(req.body);

      return res.json(restauranteAtualizado);
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

      const restaurante = await Restaurante.findByPk(id);

      if (!restaurante) {
        return res.status(400).json({
          errors: ['Nenhum restaurante com essa ID.'],
        });
      }

      await restaurante.destroy();

      return res.json(`'${restaurante.nome}' apagado.`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new RestauranteController();
