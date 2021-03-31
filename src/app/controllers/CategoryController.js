const Category = require('../models/Category');

class CategoryController {
  async index(request, response) {
    const categories = await Category.findAll();

    response.json(categories);
  }
}

module.exports = new CategoryController();
