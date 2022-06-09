import { lowerCaseNormalize, displayRecipes } from './functions.js'

// create filter lists from a pattern

function createFiltersLists (recipesList, ingredientsList, appliancesList, ustensilsList) {
  const ingredientsContainer = document.querySelector('.ingredients__content')
  ingredientsContainer.innerHTML = ''
  filtersListPattern(ingredientsList, ingredientsContainer)

  const appliancesContainer = document.querySelector('.appliances__content')
  appliancesContainer.innerHTML = ''
  filtersListPattern(appliancesList, appliancesContainer)

  const ustensilsContainer = document.querySelector('.ustensils__content')
  ustensilsContainer.innerHTML = ''
  filtersListPattern(ustensilsList, ustensilsContainer)

  displayTags(recipesList)
}

// generate and create filters lists
export function generateFiltersLists (recipesList, ingredientsList, appliancesList, ustensilsList) {
  let ingredients = []
  let appliances = []
  let ustensils = []

  recipesList.forEach((recipe) => {
    recipe.ingredients.map((element) => ingredients.push(element.ingredient))
    appliances.push(recipe.appliance)
    recipe.ustensils.map((element) => ustensils.push(element))
  })

  ingredientsList = [...new Set(ingredients)].sort()
  appliancesList = [...new Set(appliances)].sort()
  ustensilsList = [...new Set(ustensils)].sort()

  createFiltersLists(recipesList, ingredientsList, appliancesList, ustensilsList)

  return { ingredientsList, appliancesList, ustensilsList }
}

// pattern

function filtersListPattern (ElementList, ElementListcontent) {
  ElementList.forEach((element) => {
    const createListsDOM = document.createElement('li')
    createListsDOM.innerHTML = element
    createListsDOM.classList.add('list-item')
    ElementListcontent.appendChild(createListsDOM)
  })
}

// search algo on filters lists, update filters lists

export function searchOnFiltersList (recipesList, generateFiltersLists) {
  const filtersItems = generateFiltersLists(recipesList)
  const filtersInput = document.querySelectorAll('.filter-input')

  filtersInput.forEach((input) => {
    input.addEventListener('keyup', function (e) {
      const targetFilter = e.target.className
      if (targetFilter.includes('ingredients')) {
        const searchInput = lowerCaseNormalize(e.target.value)
        const filteredIngredients = filtersItems.ingredientsList.filter((ingredient) => {
          return lowerCaseNormalize(ingredient).includes(searchInput)
        })

        createFiltersLists(
          recipesList,
          filteredIngredients,
          filtersItems.appliancesList,
          filtersItems.ustensilsList
        )
      }
      if (targetFilter.includes('appliances')) {
        const searchInput = lowerCaseNormalize(e.target.value)
        const filteredAppliances = filtersItems.appliancesList.filter((appliance) => {
          return lowerCaseNormalize(appliance).includes(searchInput)
        })

        createFiltersLists(
          recipesList,
          filtersItems.ingredientsList,
          filteredAppliances,
          filtersItems.ustensilsList
        )
      }
      if (targetFilter.includes('ustensils')) {
        const searchInput = lowerCaseNormalize(e.target.value)
        const filteredUstensils = filtersItems.ustensilsList.filter((ustensil) => {
          return lowerCaseNormalize(ustensil).includes(searchInput)
        })

        createFiltersLists(
          recipesList,
          filtersItems.ingredientsList,
          filtersItems.appliancesList,
          filteredUstensils
        )
      }
    })
  })
}

// show and close filters lists (one by one)

function displayLists (obj, objlist, item, targetFilter) {
  if (targetFilter.includes(item) && obj.isFilterOpen == false) {
    for (let o of objlist) {
      o.content.style.display = 'none'
      o.input.style.width = '100%'
      o.isFilterOpen = false
    }

    obj.content.style.display = 'grid'
    obj.input.style.width = '100%'
    obj.isFilterOpen = true
  } else if (targetFilter.includes(item) && obj.isFilterOpen == true) {
    obj.content.style.display = 'none'
    obj.input.style.width = '100%'
    obj.isFilterOpen = false
  }
}

export function displayListsInit () {
  const filtersButton = document.querySelectorAll('#filters .filter-button')
  let ingredientobj = {}
  let applianceobj = {}
  let ustensilobj = {}
  ingredientobj.isFilterOpen = false
  applianceobj.isFilterOpen = false
  ustensilobj.isFilterOpen = false

  filtersButton.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const targetFilter = e.target.className

      ingredientobj.content = document.querySelector('.ingredients__content')
      ingredientobj.input = document.querySelector('.ingredients-input')

      applianceobj.content = document.querySelector('.appliances__content')
      applianceobj.input = document.querySelector('.appliances-input')

      ustensilobj.content = document.querySelector('.ustensils__content')
      ustensilobj.input = document.querySelector('.ustensils-input')

      displayLists(
        ingredientobj,
        [ingredientobj, applianceobj, ustensilobj],
        'ingredients',
        targetFilter
      )

      displayLists(
        applianceobj,
        [ingredientobj, applianceobj, ustensilobj],
        'appliances',
        targetFilter
      )
      displayLists(
        ustensilobj,
        [ingredientobj, applianceobj, ustensilobj],
        'ustensils',
        targetFilter
      )
    })
  })
}

// Create, add, remove tags

let tagsArray = []

// tag pattern

function createTag (item, recipesList) {
  const tag = document.createElement('div')
  tag.className = 'tag-item'
  const text = document.createElement('span')
  text.className = 'text'
  text.innerHTML = item
  const closeBtn = document.createElement('img')
  closeBtn.className = 'closebtn'
  closeBtn.src = './assets/close.svg'
  closeBtn.setAttribute('data-item', item)
  recipesList.forEach((recipe) => {
    const recipeIngredients = recipe.ingredients.map((element) => element.ingredient)
    if (recipe.ustensils.includes(item)) {
      tag.className = 'tag-item usten'
    } else if (recipe.appliance.includes(item)) {
      tag.className = 'tag-item applia'
    } else if (recipeIngredients.includes(item)) {
      tag.className = 'tag-item ingred'
    }
  })

  tag.appendChild(text)
  tag.appendChild(closeBtn)
  return tag
}

// prevent redisplaying the entire array list

function resetTags () {
  document.querySelectorAll('.tag-item').forEach(function (tag) {
    tag.parentElement.removeChild(tag)
  })
}

// create tags from tag pattern

function addTags (recipesList) {
  resetTags()
  const researchTag = document.querySelector('.research-tag')
  tagsArray.forEach(function (tag) {
    const input = createTag(tag, recipesList)
    researchTag.appendChild(input)
  })
}

// display tags, launch function to filter recipes display

function displayTags (recipesList) {
  const listItems = document.querySelectorAll('.list-item')
  listItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const selectItem = e.target.innerHTML
      if (!tagsArray.includes(selectItem)) {
        tagsArray.push(selectItem)
      }
      addTags(recipesList)
      displayByTagSearch(recipesList)
    })
  })
}

// remove tags on click

export function removeTags (recipesList) {
  document.addEventListener('click', function (e) {
    if (e.target.className === 'closebtn') {
      const value = e.target.getAttribute('data-item')
      const index = tagsArray.indexOf(value)
      tagsArray = [...tagsArray.slice(0, index), ...tagsArray.slice(index + 1)]
      addTags(recipesList)
      displayByTagSearch(recipesList)
    }
  })
}

// displays the recipes containing the displayed tags

function displayByTagSearch (recipesList) {
  const recipesSection = document.getElementById('recipes')
  const tags = document.querySelectorAll('.tag-item')
  const filters = Array.from(tags)
  const filteredFilters = recipesList.filter((recipe) => {
    return filters.every((item) => {
      const formatedItem = lowerCaseNormalize(item.textContent)
      return (
        recipe.ingredients.some((i) => {
          return lowerCaseNormalize(i.ingredient).includes(formatedItem)
        }) ||
        lowerCaseNormalize(recipe.appliance).includes(formatedItem) ||
        recipe.ustensils.some((ustensil) => {
          return lowerCaseNormalize(ustensil) === formatedItem
        })
      )
    })
  })
  if (filteredFilters.length) {
    recipesSection.innerHTML = ''
    displayRecipes(filteredFilters)
    generateFiltersLists(filteredFilters)
  }
}
