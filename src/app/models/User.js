const db = require('../../database/index');

class User {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM usuarios;
    `);

    return rows;
  }

  async findByLogin(login) {
    const [row] = await db.query('SELECT * FROM usuarios WHERE login = ?', [login]);

    return row;
  }

  async create(name, login, password, createdAt) {
    const row = await db.query(`
      INSERT INTO usuarios(nome, login, senha, criado_em, alterado_em)
      VALUES(?, ?, ?, ?, ?);
    `, [name, login, password, createdAt, createdAt]);

    return row;
  }
}

module.exports = new User();
