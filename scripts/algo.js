import { ELEMENTHTML } from './constant.js'
import { createElement, setIngredients, setTypeTag, removeTag, displayIngredient, displayAppliance, displayUstencil, hiddenAllList } from './function.js'
import { recipes } from './recipe.js'
export let copyRecipes = recipes

// Initialisation des variables

let recipeFilter = []
let idRecipe = []
let allIngredients = []
let allAppliances = []
let allUstensils = []
let historySearch = []
let tagArray = []

// Fonction qui permet de vérifier si l'entrée utilisateur est trouvée dans le titre, description ou ingrédient
export const searchByMainInput = (e) => {
    const inputUser = e.target.value.toLowerCase()
  
    // Si la taille de l'entrée est inférieur à 3
    if (inputUser.length < 3) {
      // Vide le tableau (pour actualiser la recherche)
      recipeFilter = []
      // Vide le tableau (pour éviter les doublons )
      idRecipe = []
      // Retourne le message suivant
      return (ELEMENTHTML.containerRecipe.innerHTML = "<p class='no-result'>Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>")
    }
  
    if (!inputUser.length && !tagArray.length) {
      createElement(copyRecipes)
      setIngredients(copyRecipes)
      createList(copyRecipes)
    }
  
    // Si l'entrée est trouvée dans le titre ou description, pousse la recette associée dans recipeFilter
    const recipeIngredients = copyRecipes.ingredients.map((el) => el.ingredient).toLowerCase()
    recipeFilter = copyRecipes.filter((recipe) => recipe.name.toLowerCase().includes(inputUser) || recipeIngredients.match(inputUser) || recipe.description.toLowerCase().match(inputUser))
    // Pousse les id de chaque recette de recipeFilter pour retirer les doublons
    idRecipe = recipeFilter.map((recipeId) => recipeId.id)
  
    // Bouclage de copyrecipes pour chercher des correspondances dans la liste d'ingrédients
    for (const recipe of copyRecipes) {
      for (const food of recipe.ingredients) {
        const ingredient = food.ingredient.toLowerCase()
        // Si l'id correspond à l'id d'une recette, alors on ignore et on passe à l'itération suivante
        if ([...idRecipe].includes(recipe.id)) {
          continue
        }
        // S'il y a une correspondance alors on pousse la recette dans recipeFilter
        if (ingredient.includes(inputUser)) {
          recipeFilter = [...recipeFilter, recipe]
        }
      }
    }
    // Si la taille de recipeFilter est vide, alors on affiche le message suivant
    if (recipeFilter.length === 0) {
      return (ELEMENTHTML.containerRecipe.innerHTML = "<p class='no-result'>Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>")
    }
    // Fonction qui va créer autant d éléments que possède recipeFilter
    createElement(recipeFilter)
    // Fonction qui va remplir les cartes de recettes en fonction de recipeFilter
    setIngredients(recipeFilter)
    // Fonction qui va créer les listes d'ingrédients, d'appliances et d'ustensils
    createList(recipeFilter)
  }