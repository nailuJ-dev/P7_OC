import { recipes } from './data/recipes.js';
import { displayRecipes } from './utils/FunctionalFunction.js';
import { generateFilterList, searchingFiltersLists, removeTag,  } from './utils/filters.js';
import { searchAlgo } from './utils/searchAlgo.js'

// Get datas and launch init
function getDatas (recipesList) {
  recipesList = searchData()
  init(recipesList); // test if need to add ingredientsLi, applianceLi, ustensilsLi
}

function searchData () {
  const searchInput = document.querySelector('.search__bar__input')
  let recipesList = recipes;
  if (searchInput.value >= 2) {
    recipesList = searchAlgo(recipesList);
  }
  return recipesList;
}

function init (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
  displayRecipes(recipesList);
  searchAlgo(recipesList);
  generateFilterList(recipesList);
  // InitDisplayList
  searchingFiltersLists(recipesList, generateFilterList);
  removeTag(recipesList, ingredientsLi, applianceLi, ustensilsLi);
}

// launch app
getDatas();