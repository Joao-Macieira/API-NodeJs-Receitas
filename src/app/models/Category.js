const db = require('../../database');

class Category {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM categorias
      ORDER BY id;
    `);

    return rows;
  }
}

module.exports = new Category();
