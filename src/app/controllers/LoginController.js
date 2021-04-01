const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

class LoginController {
  async index(request, response) {
    const { login, password } = request.body;

    if (!login || !password) return response.json({ error: 'Você precisa enviar usuário e/ou senha válidos' });

    const user = await User.findByLogin(login);

    if (!user) return response.json({ error: 'Usuário e/ou senha não incorretos' });

    const { id } = user;

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) return response.json({ error: 'E-mail e/ou senha não existe' });

    const token = jwt.sign({ id, login }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return response.json(token, user);
  }
}

module.exports = new LoginController();
