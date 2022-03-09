import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, searchingFiltersLists } from './filters.js'
import { recipes } from '../data/recipes.js';

export function updatedRecipes (item, recipesList) {
    const recipesPart = document.querySelector('.main__part');

    let filteredRecipes = recipesList.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map(el => el.ingredient).toString();
        return (
          lowerCaseNormalize(recipe.name).includes(item) ||
          lowerCaseNormalize(recipeIngredients).includes(item) ||
          lowerCaseNormalize(recipe.description).includes(item)
        );
      });
  
    if (item.length >= 3) {
        if (filteredRecipes.length > 0) {
          displayRecipes(filteredRecipes);
          generateFilterList(filteredRecipes);
          searchingFiltersLists(filteredRecipes, generateFilterList);
        } else {
          recipesPart.innerHTML =
            '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
          generateFilterList(recipesList)
          searchingFiltersLists(recipesList, generateFilterList);
        }
    } else if (item.length <= 3) {
        displayRecipes(recipes);
        generateFilterList(recipes)
        searchingFiltersLists(recipes, generateFilterList);
    }
}

export function searchAlgo (recipesList) {
  const searchInput = document.querySelector('.search__bar__input');

  searchInput.addEventListener('keyup', (el) => {
    const mainInput = lowerCaseNormalize(el.target.value);
    updatedRecipes(mainInput, recipesList);
    /* let filteredRecipes = recipesList.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map(el => el.ingredient).toString();
      return (
        lowerCaseNormalize(recipe.name).includes(mainInput) ||
        lowerCaseNormalize(recipeIngredients).includes(mainInput) ||
        lowerCaseNormalize(recipe.description).includes(mainInput)
      );
    });

    if (mainInput.length >= 3) {
      if (filteredRecipes.length > 0) {
        displayRecipes(filteredRecipes);
        generateFilterList(filteredRecipes);
        searchingFiltersLists(filteredRecipes, generateFilterList);
      } else {
        recipesPart.innerHTML =
          '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
        generateFilterList(recipesList)
        searchingFiltersLists(recipesList, generateFilterList);
      }
    } else if (mainInput.length <= 3) {
      displayRecipes(recipes);
      generateFilterList(recipes)
      searchingFiltersLists(recipes, generateFilterList);
    } */
  });
}
