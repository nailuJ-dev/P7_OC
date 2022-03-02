import { displayRecipes, lowerCaseNormalize } from './FunctionalFunction.js';

export { generateFilterList, searchingFiltersLists, removeTag,  }


// Generate items for filters' lists

function generateFilterList (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
  let ingredients = []
  let appliances = []
  let ustensiles = []

  recipesList.forEach((recipe) => {
    recipe.ingredients.map(el => ingredients.push(el.ingredient));
    appliances.push(recipe.appliance);
    recipe.ustensils.map(el => ustensiles.push(el));
  });

  ingredientsLi = [...new Set(ingredients)].sort();
  applianceLi = [...new Set(appliances)].sort();
  ustensilsLi = [...new Set(ustensiles)].sort();

  creatingFilterLi(recipesList, ingredientsLi, applianceLi, ustensilsLi);

  return { ingredientsLi, applianceLi, ustensilsLi }
}

// Generate architecture pattern for filters' lists

function filtersListsBuilder (ItemsList, ItemsListContent) {
  ItemsList.forEach(el => {
    const createDomList = document.createElement('li');
    createDomList.innerHTML = el;
    createDomList.classList.add('list__item') // add type or other thing to distinguish different categories for css
    ItemsListContent.appendChild(createDomList)
  });
}

// Create filters' lists

function creatingFilterLi (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
    const ingredientsWrapper = document.querySelector('.ingredients__content');
    ingredientsWrapper.innerHTML = '';
    filtersListsBuilder(ingredientsLi, ingredientsWrapper);

    const applianceWrapper = document.querySelector('.devices__content');
    applianceWrapper.innerHTML = '';
    filtersListsBuilder(applianceLi, applianceWrapper);

    const ustensilsWrapper = document.querySelector('.ustensiles__content');
    ustensilsWrapper.innerHTML = '';
    filtersListsBuilder(ustensilsLi, ustensilsWrapper);

    displayTag(recipesList);
}

// Searching on filters' lists

function searchingFiltersLists (recipesList, generateFilterList) {
    const filterItems = generateFilterList(recipesList);
    const filterInput = document.querySelectorAll('.filter__input');

    filterInput.forEach((input) => {
        input.addEventListener('keyup', (e) => {
            const filterTarget = e.target.className;
            if (filterTarget.includes('ingredients')) {
                const searchInput = lowerCaseNormalize(e.target.value);
                const ingredientsFiltered = filterItems.ingredientsLi.filter(ingredient => {
                    return lowerCaseNormalize(ingredient).includes(searchInput)
                });
                creatingFilterLi(recipesList, ingredientsFiltered, filterItems.applianceLi, filterItems.ustensilsLi);
            }
            if (filterTarget.includes('devices')) {
                const searchInput = lowerCaseNormalize(e.target.value);
                const appliancesFiltered = filterItems.applianceLi.filter(appliance => {
                    return lowerCaseNormalize(appliance).includes(searchInput)
                });
                creatingFilterLi(recipesList, filterItems.ingredientsLi, appliancesFiltered, filterItems.ustensilsLi);
            }
            if (filterTarget.includes('ustensiles')) {
                const searchInput = lowerCaseNormalize(e.target.value);
                const ustensilesFiltered = filterItems.ustensilsLi.filter(ustensil => {
                    return lowerCaseNormalize(ustensil).includes(searchInput)
                });
                creatingFilterLi(recipesList, filterItems.ingredientsLi, filterItems.applianceLi, ustensilesFiltered);
            }
        });
    });
}



// Create, Add and remove tags, and display recipes with tags

let tagsSelectedArray = [];

// Display recipes with tags

function displayrecipesWithTagSelected (recipesList) {
    const recipesPart = document.querySelector('.main__part');
    const tags = Array.from(document.querySelectorAll('.tag__item'));
    const tagsFiltered = recipesList.filter((recipe) => {
        return tags.every(item => {
            const formatedItem = lowerCaseNormalize(item.textContent);
            return (recipe.ingredients.some(i => {
                return lowerCaseNormalize(i.ingredient).includes(formatedItem);
            }) ||
            lowerCaseNormalize(recipe.appliance).includes(formatedItem) ||
            recipe.ustensils.some(ustensil => {
                return lowerCaseNormalize(ustensil) === formatedItem;
            }));
        });
    });
    if (tagsFiltered.length) {
        recipesPart.innerHTML = '';
        displayRecipes(tagsFiltered);
        generateFilterList(tagsFiltered);
    }
}

// Model to create tag

function creatingTag (item) {

}

// Avoid redisplaying entire tags array

function resTags () {
    document.querySelectorAll('.tag__item').forEach((tag) => {
        tag.parentElement.removeChild(tag);
    });
}

// Create tag from model

function addTag () {
    resTags();
    const searchTag = document.querySelector('.search__tag');
    tagsSelectedArray.forEach((tag) => {
        const input = creatingTag(tag);
        searchTag.appendChild(input);
    });
}

// Display tag

function displayTag (recipesList) {
    let itemList = document.querySelectorAll('.list__item');
    itemList.forEach((item) => {
      item.addEventListener('click', (el) => {
        const selectedItem = el.target.innerHTML;
        if (!tagsSelectedArray.includes(selectedItem)) {
            tagsSelectedArray.push(selectedItem);
        }
        addTag();
        displayrecipesWithTagSelected(recipesList);
      });
    });
  }

// Remove tag

function removeTag (recipesList) {
  document.addEventListener('click', (el) => {
    if (el.target.className === 'tag__close__button') {
      const value = el.target.getAttribute('data-item');
      const index = tagsSelectedArray.indexOf(value);
      tagsSelectedArray = [...tagsSelectedArray.slice(0, index), ...tagsSelectedArray.slice(index + 1)];
      addTag();
      displayrecipesWithTagSelected(recipesList);
    }
  });
}