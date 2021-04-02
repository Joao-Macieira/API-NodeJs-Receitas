const Recipes = require('../models/Recipes');

class RecipesController {
  async index(request, response) {
    const recipes = await Recipes.findAll();

    return response.json({ recipes });
  }
}

module.exports = new RecipesController();
