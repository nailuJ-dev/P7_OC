import { recipes } from './data/recipes.js';
import { displayRecipes } from './utils/FunctionalFunction.js';
import { generateFilterList, searchingFiltersLists, displayFiltersInit, removeTag } from './utils/filters.js';
import { searchAlgo } from './utils/searchAlgo.js'
// import { searchAlgo } from './utils/bigfunction.js';

function init (recipesList) {
  displayRecipes(recipesList);
  searchAlgo(recipesList);
  generateFilterList(recipesList);
  displayFiltersInit();
  searchingFiltersLists(recipesList, generateFilterList);
  removeTag(recipesList)
}

init(recipes);