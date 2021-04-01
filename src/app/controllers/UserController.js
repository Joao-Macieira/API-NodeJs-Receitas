const bcrypt = require('bcrypt');

const User = require('../models/User');

class UserController {
  async index(request, response) {
    const users = await User.findAll();

    response.json(users);
  }

  async store(request, response) {
    const { name, login, password } = request.body;

    if (!name) {
      return response.json({ error: 'Campo nome é obrigatório' });
    }

    if (!login) {
      return response.json({ error: 'Campo nome de usuário é obrigatório' });
    }

    const loginExists = await User.findByLogin(login);

    if (loginExists) return response.json({ error: 'Este nome de usuário já está em uso' });

    if (!password) {
      return response.json({ error: 'Campo senha é obrigatório' });
    }

    if (password.length < 6) {
      return response.json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const date = new Date();

    await User.create(name, login, passwordHash, date);

    const newUser = await User.findByLogin(login);

    return response.json({ newUser });
  }
}

module.exports = new UserController();
