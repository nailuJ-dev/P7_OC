import { lowerCaseNormalize, displayRecipes, generateFilterList } from './FunctionalFunction.js';
import { recipes } from '../data/recipes.js';

export { searchAlgo }

function searchAlgo (recipesList) {
  const searchInput = document.querySelector('.search__bar__input');
  const recipesPart = document.querySelector('.main__part');

  searchInput.addEventListener('keyup', (el) => {
    const mainInput = lowerCaseNormalize(el.target.value);
    let filteredRecipes = recipesList.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map(el => el.ingredient).toString();
      return (
        lowerCaseNormalize(recipe.name).includes(searchInput) ||
        lowerCaseNormalize(recipeIngredients).includes(searchInput) ||
        lowerCaseNormalize(recipe.description).includes(searchInput)
      );
    });

    if (searchInput.length >= 2) {
      if (filteredRecipes.length > 0) {
        recipesList = filteredRecipes;
        displayRecipes(recipesList);
        generateFilterList(recipesList);
        // search on filters
      } else {
        recipesPart.innerHTML =
          '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
        generateFilterList(recipesList)
        // search on filters
      }
    } else if (searchInput.length < 2) {
      recipesList = recipes;
      displayRecipes(recipesList);
      generateFilterList(recipesList)
      // search on filters
    }
  });
}
