import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, removeTag, searchingFiltersLists, displayrecipesWithTagSelected } from './filters.js'
import { recipes } from '../data/recipes.js';

let filteredRecipes = [];

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
    if (filteredRecipes.length == 0) {
        recipesPart.innerHTML =
        '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
        generateFilterList(recipes)
        searchingFiltersLists(recipes, generateFilterList);
    }
}

export function searchAlgo (recipes) {
    const searchInput = document.querySelector('.search__bar__input');

    searchInput.addEventListener('keyup', (el) => {
        if (el.target.value.length > 2) {
            const mainInput = lowerCaseNormalize(el.target.value);
            filteredRecipes = updatedRecipes(mainInput, recipes);
            console.log(filteredRecipes)
            displayRecipes(filteredRecipes);
            generateFilterList(filteredRecipes)
            searchingFiltersLists(filteredRecipes, generateFilterList);
        };
        displayRecipes(recipes)
    });
};