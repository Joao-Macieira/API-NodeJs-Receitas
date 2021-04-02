const db = require('../../database/index');

class Recipes {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM receitas
    `);

    return rows;
  }

  async create(
    userId,
    categoryId,
    name = null,
    preparationTime = null,
    portions = null,
    method,
    ingredients = null,
    createdAt,
  ) {
    const row = await db.query(`
    INSERT INTO receitas(id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes, criado_em, alterado_em)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [userId, categoryId, name, preparationTime, portions, method, ingredients, createdAt, createdAt]);

    return row;
  }
}

module.exports = new Recipes();
