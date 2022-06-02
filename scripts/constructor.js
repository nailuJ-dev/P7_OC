// Create recipe cards

export class RecipesCard {
  constructor (recipe) {
    this.id = recipe.id
    this.name = recipe.name
    this.servings = recipe.servings
    this.ingredients = recipe.ingredients
    this.time = recipe.time
    this.description = recipe.description
    this.appliance = recipe.appliance
    this.ustensils = recipe.ustensils
  }

  buildCard () {
    const card = document.createElement('article')
    card.classList.add('recipeCard')
    card.innerHTML = `
        <div class='image'> 
        <img src='./assets/img-recipe.png'>
        </div>
        <div class='textContent'>
          <div class='textContentUp'>
          <h2 class='name'>${this.name}</h2>
            <p class='time'><img class='clock' src='./assets/clock.svg' alt='time'>${
              this.time
            } min</p>
          </div>
          <div class='textContentDown'>
            <ul class='ingredients'>
            ${this.ingredients.map(
              (element) =>
                `<li><span>${element.ingredient}</span> : ${
                  'quantity' in element ? element.quantity : ''
                }
            ${'unit' in element ? element.unit : ''}`
            )}</li>
            </ul>
            <p class='description'>${this.description}</p>
          </div>
        </div>
      `
    return card
  }
}
