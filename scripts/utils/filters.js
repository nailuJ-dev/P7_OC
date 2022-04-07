import { displayRecipes, lowerCaseNormalize } from './FunctionalFunction.js';
import { searchAlgo } from './searchAlgo.js';

// Generate items for filters' lists

export function generateFilterList (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
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

export function searchingFiltersLists (recipesList) {
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

export function displayFiltersInit () {
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

export function displayrecipesWithTagSelected (recipes) {
    const searchTags = Array.from(document.querySelectorAll('.tag__item'));
    let tagsFiltered = searchTags.length ? recipes.filter((recipe) => {
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
    return tagsFiltered;

    /* if (tagsFiltered.length) {
        displayRecipes(tagsFiltered);
        generateFilterList(tagsFiltered);
        searchAlgo(tagsFiltered);
    } else {
        displayRecipes(recipes);
        generateFilterList(recipes);
    } */
}

// Model to create tag

function creatingTag (item, ingredientsLi, applianceLi) {
    let tagged = document.createElement('div');
    tagged.className = 'tag__item';
    const name = document.createElement('span');
    name.className = 'tag__item__text';
    name.innerHTML = item;
    const closeButton = document.createElement('i');
    closeButton.classList.add('fas', 'fa-times-circle', 'tag__close__button');
    closeButton.setAttribute('data-item', item);
    // console.log(name.textContent)
    // console.log(ingredientsLi)
    /* if (ingredientsLi.includes(name.textContent)) {
        tagged.setAttribute('data-item', 'ingredients__item');
    }  else if (applianceLi.includes(name.textContent)) {
        tagged.classList.add('devices__item');
    } else {
        tagged.classList.add('ustensiles__item');
    } */
    tagged.appendChild(name);
    // console.log(tagged)
    tagged.appendChild(closeButton);
    return tagged;
}

// Avoid redisplaying entire tags array

function resTags () {
    document.querySelectorAll('.tag__item').forEach((tag) => {
        tag.parentElement.removeChild(tag);
    });
}

// Create tag from model

function addTag (ingredientsLi, applianceLi) {
    resTags();
    const searchTag = document.querySelector('.search__filter');
    tagsSelectedArray.forEach((tag) => {
        const input = creatingTag(tag, ingredientsLi, applianceLi);
        console.log(searchTag)
        searchTag.appendChild(input);
    });
}

// Display tag

export function displayTag (recipesList, ingredientsLi, applianceLi) {
    let itemList = document.querySelectorAll('.list__item');
    itemList.forEach((item) => {
      item.addEventListener('click', (el) => {
        const selectedItem = el.target.innerHTML;
        if (!tagsSelectedArray.includes(selectedItem)) {
            tagsSelectedArray.push(selectedItem);
        }
        addTag(ingredientsLi, applianceLi);
        displayrecipesWithTagSelected(recipesList);
      });
    });
  }

// Remove tag

export function removeTag (recipesList, ingredientsLi, applianceLi) {
  document.addEventListener('click', (el) => {
    if (el.target.className.includes('tag__close__button')) {
      const value = el.target.getAttribute('data-item');
      tagsSelectedArray = tagsSelectedArray.filter((item) => {
        return item !== value
      });
      addTag(ingredientsLi, applianceLi);
      displayrecipesWithTagSelected(recipesList);
    }
  });
}
