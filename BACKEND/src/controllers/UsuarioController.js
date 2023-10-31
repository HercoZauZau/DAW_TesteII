import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      const {
        id, nome, sobrenome, email,
      } = novoUsuario;

      return res.json({
        id, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const usuario = await Usuario.findAll({ attributes: ['id', 'nome', 'sobrenome', 'email'] });
      return res.json(usuario);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);

      const {
        id, nome, sobrenome, email,
      } = usuario;
      return res.json({
        id, nome, sobrenome, email,
      });
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.usuarioId);

      if (!usuario) {
        return res.status(400).json({
          errors: ['Nenhum usuário com essa ID.'],
        });
      }

      const novosDados = await usuario.update(req.body);
      const {
        id, nome, sobrenome, email,
      } = novosDados;

      return res.json({
        id, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.usuarioId);

      if (!usuario) {
        return res.status(400).json({
          errors: ['Nenhum usuário com essa ID.'],
        });
      }

      await usuario.destroy();

      return res.json({
        msg: `'${usuario.nome}' apagado(a).`,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UsuarioController();
