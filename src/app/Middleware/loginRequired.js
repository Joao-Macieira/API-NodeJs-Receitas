const jwt = require('jsonwebtoken');

const User = require('../models/User');

// eslint-disable-next-line
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: 'Acesso restrito' });
  }

  const [, token] = authorization.split(' ');

  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  const { id, email } = data;

  const user = await User.findOne({
    where: {
      id,
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ errors: 'Usuário inválido' });
  }

  req.userId = id;
  req.userEmail = email;

  next();
};
