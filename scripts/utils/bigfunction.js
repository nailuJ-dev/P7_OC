import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, removeTag, searchingFiltersLists } from './filters.js'
import { recipes } from '../data/recipes.js';

let filteredRecipes = recipes;
let tagsSelectedArray = [];

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
            const mainInput = lowerCaseNormalize(el.target.value);
            filteredRecipes = updatedRecipes(mainInput, recipes);
            if (filteredRecipes.length == 0) {
                recipesPart.innerHTML =
                '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
                generateFilterList(recipes)
                searchingFiltersLists(recipes, generateFilterList);
            }
            return filteredRecipes;
        };
        displayRecipes(recipes)
    });
};

export function clickTag (recipes) {
    let itemList = document.querySelectorAll('.list__item');
    itemList.forEach((item) => {
        item.addEventListener('click', (el) => {
            const selectedItem = el.target.innerHTML;
            if (!tagsSelectedArray.includes(selectedItem)) {
                tagsSelectedArray.push(selectedItem);
            } else {

            }
        })
    })
    document.addEventListener('click', (el) => {
        if (el.target.className.includes('tag__close__button')) {
            const value = el.target.getAttribute('data-item');
            tagsSelectedArray = tagsSelectedArray.filter((item) => {
                return item !== value
            });
        }
    });
}
