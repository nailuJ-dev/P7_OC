import { recipes } from './data/recipes.js';
import { displayRecipes } from './utils/FunctionalFunction.js';
import { generateFilterList, searchingFiltersLists, removeTag, displayFiltersInit } from './utils/filters.js';
import { searchAlgo } from './utils/searchAlgo.js'

function init (recipesList) {
  displayRecipes(recipesList);
  searchAlgo(recipesList);
  generateFilterList(recipesList);
  displayFiltersInit();
  searchingFiltersLists(recipesList, generateFilterList);
}

init(recipes);