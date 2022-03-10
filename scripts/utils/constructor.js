// Build the cards for the main part which displaying results

export default class BuildMainRecipeCards {
  constructor (recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
  }

  buildingRecipePart () {
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipe__card');
    recipeCard.innerHTML = `
      <div class="recipe__card__image">
      </div>
      <div class="recipe__card__section">
        <div class="recipe__card__header">
        <h2 class="recipe__card__header__title">${this.name}</h2>
          <p class="recipe__card__header__time"><i class="fas fa-clock recipe__card__header__icon"></i> ${
            this.time
          } min</p>
        </div>
        <aside class="recipe__card__aside">
          <ul class="recipe__card__list">
          ${this.ingredients.map(
            (element) =>
              `<li><span>${element.ingredient}</span> : ${
                'quantity' in element ? element.quantity : ''
              }
          ${'unit' in element ? element.unit : ''}`
          )}</li>
          </ul>
          <p class="recipe__card__description">${this.description}</p>
        </aside>
      </div>
    `;
    return recipeCard;
  }
}
