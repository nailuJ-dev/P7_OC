import { BuildMainRecipeCards } from './constructor.js';
import { searchAlgo } from './searchAlgo.js';

// Lower and normalize text content

export function lowerCaseNormalize (items) {
  return items
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function displayRecipes (recipesList) {
  const recipesPart = document.querySelector('.main__part')
  recipesPart.innerHTML = '';
  recipesList.forEach(recipe => {
    recipesPart.appendChild(new BuildMainRecipeCards(recipe).buildingRecipePart());
  });
}