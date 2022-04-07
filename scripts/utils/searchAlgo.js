import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, removeTag, searchingFiltersLists, displayrecipesWithTagSelected } from './filters.js'
import { recipes } from '../data/recipes.js';

let filteredRecipes = recipes;

function updatedRecipes (item, recipes) {
    filteredRecipes = recipes.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map((el) => el.ingredient).toString();
        return (
            lowerCaseNormalize(recipe.name).includes(item) ||
            lowerCaseNormalize(recipeIngredients).includes(item) ||
            lowerCaseNormalize(recipe.description).includes(item)
        );
    });
}

export function searchAlgo (recipes) {
    const searchInput = document.querySelector('.search__bar__input');
    const recipesPart = document.querySelector('.main__part');

    searchInput.addEventListener('keyup', (el) => {
        if (el.target.value.length > 2) {
            console.log("plop")
            const mainInput = lowerCaseNormalize(el.target.value);
            filteredRecipes = updatedRecipes(mainInput, recipes);
            console.log(filteredRecipes.length)
            /* if (filteredRecipes.length == 0) {
                recipesPart.innerHTML =
                '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
                generateFilterList(recipes)
                searchingFiltersLists(recipes, generateFilterList);
            }*/
            console.log(filteredRecipes)
            displayRecipes(filteredRecipes);
            generateFilterList(filteredRecipes)
            searchingFiltersLists(filteredRecipes, generateFilterList);
        };
        displayRecipes(recipes)
    });
};