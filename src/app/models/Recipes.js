const db = require('../../database/index');

class Recipes {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM receitas
    `);

    return rows;
  }

  async create(
    userId, categoryId, name, preparationTime, portions, method, ingredients,
  ) {
    const row = await db.query(`
    INSERT INTO usuarios(nome, login, senha, criado_em, alterado_em)
    VALUES(?, ?, ?, ?, ?);
  `, [name, login, password, createdAt, createdAt]);

    return row;
  }
}

module.exports = new Recipes();
