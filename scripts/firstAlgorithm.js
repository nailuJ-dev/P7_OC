import { ELEMENTHTML } from './constant.js';
import { createElement, setIngredients, setTypeTag, removeTag, displayIngredient, displayAppliance, displayUstencil, hiddenAllList } from './function.js';
import { recipes } from './recipe.js';
export let copyRecipes = recipes;

// Initialisation des variables

let recipeFilter = [];
let idRecipe = [];
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let historySearch = [];

// Fonction qui permet de vérifier si l'entrée utilisateur est trouvée dans le titre, description ou ingrédient
export const searchByMainInput = (e) => {
  // stocke la saisie utilisateur en minuscule
  const inputUser = e.target.value.toLowerCase();

  // Si la taille de l'entrée est inférieur à 3
  if (inputUser.length < 3) {
    // Vide le tableau (pour actualiser la recherche)
    recipeFilter = [];
    // Vide le tableau (pour éviter les doublons )
    idRecipe = [];
    // Retourne le message suivant
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class='no-result'>Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  // Si l'entrée est trouvée dans le titre ou description, pousse la recette associée dans recipeFilter
  recipeFilter = copyRecipes.filter((recipe) => recipe.name.toLowerCase().match(inputUser) || recipe.description.toLowerCase().match(inputUser));
  // Pousse les id de chaque recette de recipeFilter pour retirer les doublons
  idRecipe = recipeFilter.map((recipeId) => recipeId.id);

  // Bouclage de copyrecipes pour chercher des correspondances dans la liste d'ingrédients
  for (const recipe of copyRecipes) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      // Si l'id correspond à l'id d'une recette, alors on ignore et on passe à l'itération suivante
      if ([...idRecipe].includes(recipe.id)) {
        continue;
      }
      // S'il y a une correspondance alors on pousse la recette dans recipeFilter
      if (ingredient.includes(inputUser)) {
        recipeFilter = [...recipeFilter, recipe];
      }
    }
  }
  // Si la taille de recipeFilter est vide, alors on affiche le message suivant
  if (recipeFilter.length === 0) {
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class='no-result'>Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }
  // Fonction qui va créer autant d éléments que possède recipeFilter
  createElement(recipeFilter);
  // Fonction qui va remplir les cartes de recettes en fonction de recipeFilter
  setIngredients(recipeFilter);
  // Fonction qui va créer les listes d'ingrédients, d'appliances et d'ustensils
  createList(recipeFilter);
};

// Fonction qui va permettre d'afficher les éléments restants en fonction d'un array
export const createList = (array) => {
  // Retourne un tableau, un avec tous les ingrédients restants, un avec tous les appliances restants etc...
  const listTemporyIngredient = array.flatMap((item) => item.ingredients.map((el) => el.ingredient.toLowerCase()));
  const listTemporyAppliance = array.map((item) => item.appliance.toLowerCase());
  const listTemporyUstensil = array.flatMap((item) => item.ustensils).map((el) => el.toLowerCase());
  // Suppression des doublons en fonctions de l'index de l'élément , s'il est égal à l'index en cours on ajoute
  allIngredients = listTemporyIngredient.filter((element, position) => listTemporyIngredient.indexOf(element) === position);
  allAppliances = listTemporyAppliance.filter((element, position) => listTemporyAppliance.indexOf(element) === position);
  allUstensils = listTemporyUstensil.filter((element, position) => listTemporyUstensil.indexOf(element) === position);

  showList(array);
};

// Fonction qui montre les listes
const showList = (array) => {
  // On rentre dans les éléments html suivants chaque valeur du tableau et on retire la virgule avec join
  ELEMENTHTML.listFood.innerHTML = `${allIngredients.map((ingredient) => `<li class='list-ingredient ing'>${ingredient}</li>`).join('')}`;
  ELEMENTHTML.listItem.innerHTML = `${allAppliances.map((appliance) => `<li class='list-appliance object'>${appliance}</li>`).join('')}`;
  ELEMENTHTML.listUStencil.innerHTML = `${allUstensils.map((ustensil) => `<li class='list-ustencil ustencil'>${ustensil}</li>`).join('')}`;
  // Fonction qui permet d'ajouter un tag
  choiceInList(array);
  // Fonctions qui permettent d'afficher une liste et retirer les autres
  ELEMENTHTML.box[0].addEventListener('click', displayIngredient);
  ELEMENTHTML.box[1].addEventListener('click', displayAppliance);
  ELEMENTHTML.box[2].addEventListener('click', displayUstencil);
  // Permet à l'utilisateur de tout fermer pour voir les recettes, true permet d'exécuter l'event
  document.body.addEventListener('click', hiddenAllList, true)
  // Permet une saisie utilisateur pour filtrer la liste en cours
  ELEMENTHTML.inputIngredient.addEventListener('input', (e) => filteredList(e));
  ELEMENTHTML.inputAppliance.addEventListener('input', (e) => filteredList(e));
  ELEMENTHTML.inputUstencil.addEventListener('input', (e) => filteredList(e));
};

// Fonction qui permet d'afficher uniquement les éléments qui correspondent à la saisie utilisateur
const filteredList = (e) => {
  // Variable qui contient la saisie utilisateur en minuscule
  let inputUser = e.target.value.toLowerCase();
  // On cible tous les éléments listés disponibles
  [...document.querySelectorAll('li')].forEach((el) => {
    // Pour chacun des cas, si la saisie est supérieure ou égale à 3 et ne correspond pas au contenu de l'élément
    if (inputUser.length >= 3 && !el.innerHTML.includes(inputUser)) {
      // on le retire de l 'affichage
      el.style.display = 'none';
    }
  });
};

// Permet d'ajouter un tag
const choiceInList = (array) => {
  // pour chaque element , siclick on appelle la fonction addTag
  [...document.querySelectorAll('li')].forEach((el) => el.addEventListener('click', () => addTag(el, array)));
};

// Fonction qui permet d'ajouter un tag
const addTag = (element, array) => {
  // Permet d'associer la couleur en fonction du type de liste
  let classTag = setTypeTag(element);
  // Ajoute un tag avec son contenu
  ELEMENTHTML.allTags.innerHTML += `<p class='tag ${classTag}'>${element.innerHTML}<span class='far fa-times-circle'></span></p>`;
  // Fonction qui permet de continuer la recherche
  stepRecipeFiltered(element.innerHTML, array);
};

// Permet de continuer la recherche
const stepRecipeFiltered = (tag, array) => {
  // On initialise un array qui stockera temporairement l'array en paramètre
  let stockageTemporay = [];
  // Bouclage pour vérifier une correspondance
  for (const recipe of array) {
    for (const food of recipe.ingredients) {
      const ingredient = food.ingredient.toLowerCase();
      if (ingredient.includes(tag.toLowerCase())) {
        // Si oui, on stocke la recette dans stockageTempory
        stockageTemporay = [...stockageTemporay, recipe];
      }
    }
    // On fait pareil pour les inputs suivants
    const appliance = recipe.appliance.toLowerCase();
    if (appliance.includes(tag.toLowerCase())) {
      stockageTemporay = [...stockageTemporay, recipe];
    }

    for (const ustensil of recipe.ustensils) {
      if (ustensil.includes(tag.toLowerCase())) {
        stockageTemporay = [...stockageTemporay, recipe];
      }
    }
  }

  // On pousse le tableau dans historySearch, en cas de retour en arrière, on peut réafficher la resultat de la recherche précédente
  historySearch.push(array);
  // array = stockageTempory
  array = stockageTemporay;
  // Et on affiche autant de recettes que d'array
  createElement(array);
  setIngredients(array);
  createList(array);
  // Fonction qui permet de supprimer un tag
  [...document.querySelectorAll('.fa-times-circle')].forEach((cross, key) => cross.addEventListener('click', () => removeTag(key, historySearch)));
};

// S'il n'y a pas de tag et de valeur dans la barre principale, alors au click on créer une liste
ELEMENTHTML.inputIngredient.addEventListener('click', () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});

ELEMENTHTML.inputAppliance.addEventListener('click', () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});

ELEMENTHTML.inputUstencil.addEventListener('click', () => {
  if (!ELEMENTHTML.mainSearch.value && !ELEMENTHTML.allTags.innerHTML) {
    createList(copyRecipes);
  }
});
