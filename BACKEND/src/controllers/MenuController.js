import Menu from '../models/Menu';

class MenuController {
  async index(req, res) {
    try {
      const restaurante = await Menu.findAll({
        order: [['id', 'DESC']],

      });
      return res.json(restaurante);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errors: ['Erro de conexao'],
      });
    }
  }

  async indexUSer(req, res) {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res.status(400).json({
          errors: ['ID necessário'],
        });
      }

      const restaurante = await Menu.findAll({
        where: {
          user_id,
        },

      });
      return res.json(restaurante);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errors: ['Erro de conexao'],
      });
    }
  }

  async store(req, res) {
    try {
      const menu = await Menu.create(req.body);

      return res.json(menu);
    } catch (e) {
      console.log(e);
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

      const restaurante = await Menu.findByPk(id, {
        // attributes: ['id', 'nome'],
        order: [['id', 'DESC']],

      });

      if (!restaurante) {
        return res.status(404).json({
          errors: ['Nenhum menu com essa ID.'],
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

      const restaurante = await Menu.findByPk(id);

      if (!restaurante) {
        return res.status(400).json({
          errors: ['Nenhum menu com essa ID.'],
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

      const restaurante = await Menu.findByPk(id);

      if (!restaurante) {
        return res.status(400).json({
          errors: ['Nenhum prato com essa ID.'],
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

export default new MenuController();
