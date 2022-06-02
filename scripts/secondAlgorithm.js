import { lowerCaseNormalize, displayRecipes } from './functions.js'
import { searchOnFiltersList, generateFiltersLists } from './filter.js'
import { recipes } from '../data/recipes.js'

// search on navbar

export function searchBar (recipesList) {
  const searchInput = document.getElementById('site-search')
  const recipesSection = document.getElementById('recipes')

  // listen search bar input
  searchInput.addEventListener('keyup', (e) => {
    const input = lowerCaseNormalize(e.target.value)
    // get filtered recipes object
    let filteredRecipes = []

    for (let i = 0; i < recipesList.length; i++) {
      const namesList = lowerCaseNormalize(recipesList[i].name).includes(input)
      const descriptionsList = lowerCaseNormalize(recipesList[i].description).includes(input)
      let ingredientsList = []

      for (let j = 0; j < recipesList[i].ingredients.length; j++) {
        ingredientsList = lowerCaseNormalize(recipesList[i].ingredients[j].ingredient).includes(input)
      }

      if (namesList || descriptionsList || ingredientsList) {
        filteredRecipes.push(recipesList[i])
      }
    }

    // displays recipes under conditions
    if (input.length >= 3) {
      if (filteredRecipes.length > 0) {
        recipesList = filteredRecipes
        displayRecipes(recipesList)
        generateFiltersLists(recipesList)
        searchOnFiltersList(recipesList, generateFiltersLists)
      } else {
        recipesSection.innerHTML =
          '<div class="missing">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>'
        generateFiltersLists(recipesList)
        searchOnFiltersList(recipesList, generateFiltersLists)
      }
    } else if (input.length <= 3) {
      recipesList = recipes
      displayRecipes(recipesList)
      generateFiltersLists(recipesList)
      searchOnFiltersList(recipesList, generateFiltersLists)
    }
  })
}
