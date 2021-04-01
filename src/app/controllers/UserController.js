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

    const day = (date.getDate()) > 10 ? (date.getDate()) : `0${(date.getDate())}`;
    const month = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`;
    const year = date.getFullYear() > 10 ? (date.getFullYear()) : `0${(date.getFullYear())}`;
    const hour = date.getHours() > 10 ? (date.getHours()) : `0${(date.getHours())}`;
    const minute = date.getMinutes() > 10 ? (date.getMinutes()) : `0${(date.getMinutes())}`;
    const second = date.getSeconds() > 10 ? (date.getSeconds()) : `0${(date.getSeconds())}`;

    const formatDate = `${year}/${month}/${day} ${hour - 3}:${minute}:${second}`;

    const newUser = await User.create(name, login, passwordHash, formatDate);

    return response.json({ newUser });
  }
}

module.exports = new UserController();
