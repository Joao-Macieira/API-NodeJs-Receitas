const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

class LoginController {
  async index(request, response) {
    const { login, password } = request.body;

    if (!login || !password) return response.json({ error: 'Você precisa enviar usuário e/ou senha válidos' });

    const user = await User.findByLogin(login);

    if (!user) return response.json({ error: 'Usuário e/ou senha incorretos' });

    const { id, nome } = user;

    const matchPass = await bcrypt.compare(password, user.senha);

    if (!matchPass) return response.json({ error: 'Usuário e/ou senha incorretos' });

    const token = jwt.sign({ id, login }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return response.json({ token, nome, login });
  }
}

module.exports = new LoginController();
