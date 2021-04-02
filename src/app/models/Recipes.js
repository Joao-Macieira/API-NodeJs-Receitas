const db = require('../../database/index');

class Recipes {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM receitas
    `);

    return rows;
  }
}

module.exports = new Recipes();
