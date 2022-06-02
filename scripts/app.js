// importer toutes les fonctions utilisées
import { searchBar } from './secondAlgorithm.js'
import { generateFiltersLists, displayListsInit, searchOnFiltersList, removeTags } from './filter.js'
import { recipes } from './recipes.js'
import { displayRecipes } from './functions.js'

// get recipes list (original + updated) and launch init

function launchApp (recipesList) {
  recipesList = data()
  init(recipesList)
}

function data () {
  const searchInput = document.getElementById('site-search')
  let recipesList = recipes
  if (searchInput.value >= 3) {
    recipesList = searchBar(recipesList)
  }
  return recipesList
}

function init (recipesList) {
  displayRecipes(recipesList)
  searchBar(recipesList)
  generateFiltersLists(recipesList)
  displayListsInit()
  searchOnFiltersList(recipesList, generateFiltersLists)
  removeTags(recipesList)
}

launchApp()
