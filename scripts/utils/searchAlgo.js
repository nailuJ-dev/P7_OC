import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, removeTag, searchingFiltersLists, displayrecipesWithTagSelected } from './filters.js'
import { recipes } from '../data/recipes.js';

let filteredRecipes = recipes;
let ingredientsLi = [];
let ustensilsLi = [];
let applianceLi = [];

function updatedRecipes (item, recipes) {
    const recipesPart = document.querySelector('.main__part');

    filteredRecipes = recipes.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map((el) => el.ingredient).toString();
        return (
            lowerCaseNormalize(recipe.name).includes(item) ||
            lowerCaseNormalize(recipeIngredients).includes(item) ||
            lowerCaseNormalize(recipe.description).includes(item)
        );
    });

    displayRecipes(recipes);
    generateFilterList(recipes)
    searchingFiltersLists(recipes, generateFilterList);
  
    if (item.length >= 3) {
        if (filteredRecipes.length > 0) {
          displayRecipes(filteredRecipes);
          generateFilterList(filteredRecipes);
          searchingFiltersLists(filteredRecipes, generateFilterList);
        } else {
          recipesPart.innerHTML =
            '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
          generateFilterList(recipes)
          searchingFiltersLists(recipes, generateFilterList);
        }
    }

    return filteredRecipes;
}

export function searchAlgo (recipes) {
    const searchInput = document.querySelector('.search__bar__input');

    searchInput.addEventListener('keyup', (el) => {
        const mainInput = lowerCaseNormalize(el.target.value);
        filteredRecipes = updatedRecipes(mainInput, recipes);

        displayrecipesWithTagSelected(filteredRecipes)
        removeTag(filteredRecipes);
    });
    removeTag(filteredRecipes)
};