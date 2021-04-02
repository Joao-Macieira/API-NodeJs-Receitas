const db = require('../../database/index');

class Recipes {
  async findAll() {
    const rows = await db.query(`
      SELECT receitas.*, usuarios.nome AS autor, categorias.nome AS categoria
      FROM receitas
      LEFT JOIN usuarios ON usuarios.id = receitas.id_usuarios
      LEFT JOIN categorias ON categorias.id = receitas.id_categorias
    `);

    return rows;
  }

  async findById(id) {
    const row = await db.query(`
      SELECT receitas.*, usuarios.nome AS autor, categorias.nome AS categoria
      FROM receitas
      LEFT JOIN usuarios ON usuarios.id = receitas.id_usuarios
      LEFT JOIN categorias ON categorias.id = receitas.id_categorias
      WHERE receitas.id = ?
    `, [id]);

    return row;
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

  async delete(id) {
    const row = await db.query(`
      DELETE FROM receitas
      WHERE id = ?
    `, [id]);

    return row;
  }
}

module.exports = new Recipes();
