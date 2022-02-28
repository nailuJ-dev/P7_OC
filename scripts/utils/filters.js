import { lowerCaseNormalize } from './FunctionalFunction.js';

export { generateFilterList,  }


// Generate items for filters' lists

function generateFilterList (recipesList, ingredientsLi, applianceLi, ustensilsLi) {
  let ingredients = []
  let appliances = []
  let ustensiles = []

  recipesList.forEach((recipe) => {
    recipe.ingredients.map(el => ingredients.push(el.ingredient));
    appliances.push(recipe.appliance);
    recipe.ustensiles.map(el => ustensiles.push(el));
  });

  ingredientsLi = [...new Set(ingredients)].sort();
  applianceLi = [...new Set(appliances)].sort();
  ustensilsLi = [...new Set(ustensiles)].sort();

  createFiltersLists(recipesList, ingredientsLi, applianceLi, ustensilsLi);

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
