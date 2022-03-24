import { lowerCaseNormalize, displayRecipes } from './FunctionalFunction.js';
import { generateFilterList, removeTag, searchingFiltersLists } from './filters.js'
import { recipes } from '../data/recipes.js';

export let lastSearch = [];

// insert removeTag in searchAlgo

export function updatedRecipes (item, recipesList) {
    let filteredRecipes = recipesList.filter((recipe) => {
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
        displayRecipes(recipes);
        generateFilterList(recipes)
        searchingFiltersLists(recipes, generateFilterList);
    }
    return filteredRecipes;
}

export function searchAlgo (recipesList) {
    const searchInput = document.querySelector('.search__bar__input');
    const searchTags = document.querySelector('.search__filter');
    const recipesPart = document.querySelector('.main__part');

    const tagsFiltered = searchTags.length ? recipesList.filter((recipe) => {
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
    if (tagsFiltered.length) {
        recipesPart.innerHTML = '';
        displayRecipes(tagsFiltered);
        generateFilterList(tagsFiltered);
        removeTag(tagsFiltered);
        searchInput.addEventListener('keyup', (el) => {
            if (el.target.value.length < 3) {
                searchingFiltersLists(tagsFiltered);
                displayRecipes(tagsFiltered);
                removeTag(tagsFiltered)
            }
        
            if (el.target.value.length > 3) {
                const mainInput = lowerCaseNormalize(el.target.value);
                const filteredRecipes = updatedRecipes(mainInput, tagsFiltered);
        
                searchingFiltersLists(filteredRecipes);
        
                displayRecipes(filteredRecipes);
                removeTag(filteredRecipes)
            }
        });
    } else {
        recipesPart.innerHTML = '';
        displayRecipes(recipesList);
        generateFilterList(recipesList);
        removeTag(recipesList);
        searchInput.addEventListener('keyup', (el) => {
            if (!el.target.value.length < 3) {
                searchingFiltersLists(recipesList);
                displayRecipes(recipesList);
                removeTag(recipesList)
            }
        
            if (el.target.value.length > 3) {
                const mainInput = lowerCaseNormalize(el.target.value);
                const filteredRecipes = updatedRecipes(mainInput, recipesList);
                
                searchingFiltersLists(filteredRecipes);
        
                displayRecipes(filteredRecipes);
                removeTag(filteredRecipes)
            }
        });
    }
}
