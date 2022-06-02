import { RecipesCard } from './constructor.js'
// function to lower case and normalize text

export function lowerCaseNormalize (items) {
  return items
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// display recipes function

export function displayRecipes (recipesList) {
  const recipesSection = document.getElementById('recipes')
  recipesSection.innerHTML = ''
  recipesList.forEach((recipe) => {
    recipesSection.appendChild(new RecipesCard(recipe).buildCard())
  })
}
