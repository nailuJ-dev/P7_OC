import { BuildMainRecipeCards } from "./constructor.js";

export { lowerCaseNormalize, displayRecipes }

// Lower and normalize text content

function lowerCaseNormalize (items) {
  return items
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function displayRecipes (recipesList) {
  const recipesPart = document.querySelector('.main__part')
  recipesPart.innerHTML = '';
  recipesList.forEach(recipe => {
    recipesPart.appendChild(new BuildMainRecipeCards(recipe).buildingRecipePart());
  });
}