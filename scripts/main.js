import { recipes } from './data/recipes.js';
import { displayRecipes } from './utils/FunctionalFunction.js';
import { generateFilterList, searchingFiltersLists } from './utils/filters.js';
import { searchAlgo } from './utils/searchAlgo.js'

// Get datas and launch init
function getDatas (recipesList) {
  recipesList = searchData()
  init(recipesList);
}

function searchData () {
  const searchInput = document.querySelector('.search__bar__input')
  let recipesList = recipes;
  if (searchInput.value >= 2) {
    recipesList = searchAlgo(recipesList);
  }
  return recipesList;
}

function init (recipesList) {
  displayRecipes(recipesList);
  searchAlgo(recipesList);
  generateFilterList(recipesList);

  searchingFiltersLists(recipesList, generateFilterList);
}

// launch app
getDatas();