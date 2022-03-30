import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, removeTag, searchingFiltersLists } from './filters.js'
import { recipes } from '../data/recipes.js';

let filteredRecipes = recipes;

function updatedRecipes (item, recipesList) {
    const recipesPart = document.querySelector('.main__part');
    filteredRecipes = recipesList.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map((el) => el.ingredient).toString();
        return (
            lowerCaseNormalize(recipe.name).includes(item) ||
            lowerCaseNormalize(recipeIngredients).includes(item) ||
            lowerCaseNormalize(recipe.description).includes(item)
        );
    });
  
    if (item.length >= 3) {
        if (filteredRecipes.length > 0) {
          displayRecipes(filteredRecipes);
          generateFilterList(filteredRecipes);
          searchingFiltersLists(filteredRecipes, generateFilterList);
        } else {
          recipesPart.innerHTML =
            '<div class="no__matching">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
          generateFilterList(recipesList)
          searchingFiltersLists(recipesList, generateFilterList);
        }
    } else if (item.length < 3) {
        displayRecipes(recipesList);
        generateFilterList(recipesList)
        searchingFiltersLists(recipesList, generateFilterList);
    }
    return filteredRecipes;
}

export function searchAlgo () {
    const searchInput = document.querySelector('.search__bar__input');
    const searchTags = document.querySelector('.search__filter');
    const recipesPart = document.querySelector('.main__part');

    let tagsFiltered = searchTags.length ? filteredRecipes.filter((recipe) => {
        return searchTags.every(item => {
            const formatedItem = lowerCaseNormalize(item.textContent);
            return (recipe.ingredients.some(i => {
                return lowerCaseNormalize(i.ingredient).includes(formatedItem);
            }) ||
            lowerCaseNormalize(recipe.appliance).includes(formatedItem) ||
            recipe.ustensils.some(ustensil => {
                return lowerCaseNormalize(ustensil) === formatedItem;
            }));
        });
    })
    : [];
    console.log(tagsFiltered)
    if (tagsFiltered.length > 0) {
        recipesPart.innerHTML = '';
        displayRecipes(tagsFiltered);
        generateFilterList(tagsFiltered);
        searchInput.addEventListener('keyup', (el) => {
            console.log(tagsFiltered)
            const mainInput = lowerCaseNormalize(el.target.value);
            filteredRecipes = updatedRecipes(mainInput, tagsFiltered);
        
            searchingFiltersLists(filteredRecipes);
        
            displayRecipes(filteredRecipes);
            removeTag(filteredRecipes)
        });
        removeTag(tagsFiltered);
    } else {
        recipesPart.innerHTML = '';
        displayRecipes(filteredRecipes);
        generateFilterList(filteredRecipes);
        searchInput.addEventListener('keyup', (el) => {
            const mainInput = lowerCaseNormalize(el.target.value);
            filteredRecipes = updatedRecipes(mainInput, filteredRecipes);
                
            searchingFiltersLists(filteredRecipes);
        
            displayRecipes(filteredRecipes);
            removeTag(filteredRecipes)
        });
        removeTag(filteredRecipes);
    }
    removeTag(filteredRecipes)
}