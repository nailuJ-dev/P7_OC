import { displayRecipes, lowerCaseNormalize } from './FunctionalFunction.js';
import { updatedRecipes, searchAlgo } from './searchAlgo.js';

export { generateFilterList, searchingFiltersLists, removeTag, displayFiltersInit }

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

    displayTag(recipesList, ingredientsLi, applianceLi, ustensilsLi);
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

// Display & close filters

function displayFilters (obj, objlist, item, filterTarget) {
    // const filterInput = document.querySelectorAll('.filter__input');
    if (filterTarget.includes(item) && obj.isFilterOpen == false) {
        for (let ob of objlist) {
            ob.content.style.display = 'flex';
            ob.input.style.display = 'none';
            ob.input.style.width = 'null';
            ob.isFilterOpen = false;
            ob.text.value = '';
        }
        obj.content.style.display = 'none';
        obj.input.style.display = 'flex';
        obj.isFilterOpen = true;
        obj.text.focus();

    } else if (filterTarget.includes(item) && obj.isFilterOpen == true) {
        obj.content.style.display = 'flex';
        obj.input.style.display = 'none';
        obj.isFilterOpen = false;
        obj.text.value = '';
    };
}

// Close & display with click

function displayFiltersInit () {
    const buttonFilter = document.querySelectorAll('.search__area__form__down, .search__area__form__up');
    let ingredientObject = {};
    let applianceObject = {};
    let ustensilesObject = {};
    ingredientObject.isFilterOpen = false;
    applianceObject.isFilterOpen = false;
    ustensilesObject.isFilterOpen = false;

    buttonFilter.forEach(btn => {
        btn.addEventListener('click', (el) => {
            const filterTarget = el.target.className;

            ingredientObject.content = document.querySelector('.ingredients__form__down');
            ingredientObject.input = document.querySelector('.ingredients__displayed__results');
            ingredientObject.text = document.querySelector('.ingredients__input')
            applianceObject.content = document.querySelector('.devices__form__down');
            applianceObject.input = document.querySelector('.devices__displayed__results');
            applianceObject.text = document.querySelector('.devices__input')
            ustensilesObject.content = document.querySelector('.ustensiles__form__down');
            ustensilesObject.input = document.querySelector('.ustensiles__displayed__results');
            ustensilesObject.text = document.querySelector('.ustensiles__input')

            displayFilters(ingredientObject, [ingredientObject, applianceObject, ustensilesObject], 'ingredients', filterTarget); // 'item' name needs to be check
            displayFilters(applianceObject, [ingredientObject, applianceObject, ustensilesObject], 'devices', filterTarget); // 'item' name needs to be check
            displayFilters(ustensilesObject, [ingredientObject, applianceObject, ustensilesObject], 'ustensiles', filterTarget); // 'item' name needs to be check
        });
    });
}

// Create, Add and remove tags, and display recipes with tags

let tagsSelectedArray = [];

// Display recipes with tags

function displayrecipesWithTagSelected (recipesList) {
    const recipesPart = document.querySelector('.main__part');
    const tags = Array.from(document.querySelectorAll('.tag__item'));
    const tagsFiltered = tags.length ? recipesList.filter((recipe) => {
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
    })
    : [];

    if (tagsFiltered.length) {
        recipesPart.innerHTML = '';
        displayRecipes(tagsFiltered);
        generateFilterList(tagsFiltered);
    } else {
        recipesPart.innerHTML = '';
        displayRecipes(recipesList);
        generateFilterList(recipesList);
    }
}

// Model to create tag

function creatingTag (item, ingredientsLi, applianceLi, ustensilsLi) {
    let tag = document.createElement('div');
    tag.className = 'tag__item';
    const name = document.createElement('span');
    name.className = 'tag__item__text';
    name.innerHTML = item;
    const closeButton = document.createElement('i');
    closeButton.classList.add('fas', 'fa-times-circle', 'tag__close__button');
    closeButton.setAttribute('data-item', item);
    console.log(ingredientsLi)
    console.log(item)
    /* if (ingredientsLi.includes(item)) {
        tag.classList.add('ingredients__item');
    } else if (applianceLi.includes(item)) {
        tag.classList.add('devices__item');
    } else {
        tag.classList.add('ustensiles__item');
    }; */
    console.log(tag)
    tag.appendChild(name);
    tag.appendChild(closeButton);
    return tag;
}

// Avoid redisplaying entire tags array

function resTags () {
    document.querySelectorAll('.tag__item').forEach((tag) => {
        tag.parentElement.removeChild(tag);
    });
}

// Create tag from model

function addTag (ingredientsLi, applianceLi, ustensilsLi) {
    resTags();
    const searchTag = document.querySelector('.search__filter');
    tagsSelectedArray.forEach((tag) => {
        const input = creatingTag(tag, ingredientsLi, applianceLi, ustensilsLi);
        console.log(tag)
        /* if (ingredientsLi.includes(tag.textContent)) {
            tag.classList.add('ingredients__item');
        } else if (applianceLi.includes(tag.textContent)) {
            tag.classList.add('devices__item');
        } else {
            tag.classList.add('ustensiles__item');
        }; */
        searchTag.appendChild(input);
    });
}

// Display tag

function displayTag (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
    let itemList = document.querySelectorAll('.list__item');
    itemList.forEach((item) => {
      item.addEventListener('click', (el) => {
        const selectedItem = el.target.innerHTML;
        if (!tagsSelectedArray.includes(selectedItem)) {
            tagsSelectedArray.push(selectedItem);
        }
        addTag(ingredientsLi, applianceLi, ustensilsLi);
        displayrecipesWithTagSelected(recipesList); //replace recipeList by TagsSelectedArray
      });
    });
  }

// Remove tag

function removeTag (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
  document.addEventListener('click', (el) => {
    if (el.target.className.includes('tag__close__button')) {
      const value = el.target.getAttribute('data-item');
      const index = tagsSelectedArray.indexOf(value);
      tagsSelectedArray = [...tagsSelectedArray.slice(0, index), ...tagsSelectedArray.slice(index + 1)];
      addTag(ingredientsLi, applianceLi, ustensilsLi);
      displayrecipesWithTagSelected(recipesList); //replace recipeList by TagsSelectedArray
    }
  });
}
