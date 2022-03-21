import { recipes } from './data/recipes.js';
import { displayRecipes } from './utils/FunctionalFunction.js';
import { generateFilterList, searchingFiltersLists, removeTag, displayFiltersInit } from './utils/filters.js';
import { searchAlgo } from './utils/searchAlgo.js'

// Get datas and launch init
function getDatas (recipesList) {
  recipesList = searchData()
  init(recipesList); // test if need to add ingredientsLi, applianceLi, ustensilsLi
}

function searchData () {
  let recipesList = recipes;
  return recipesList;
}

function init (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
  displayRecipes(recipesList);
  searchAlgo(recipesList);
  generateFilterList(recipesList);
  displayFiltersInit();
  searchingFiltersLists(recipesList, generateFilterList);
  removeTag(recipesList, ingredientsLi, applianceLi, ustensilsLi);
}

// launch app
getDatas();