import { ELEMENTHTML } from './constant.js';
import { createElement, setIngredients, setTypeTag, removeTag, displayIngredient, displayAppliance, displayUstencil, hiddenAllList } from './function.js';
import { recipes } from './recipe.js';
export let copyRecipes = recipes;

// Initialisiation des variables
let recipeFilter = [];
let idRecipe = [];
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let historySearch = [];

// Fonction qui permet de verifier si l'entrée utilisateur est trouvée dans le titre, description ou ingrédient
export const searchByMainInput = (e) => {
  const inputUser = e.target.value.toLowerCase();
  // Vide le tableau (pour actualiser la recherche)
  recipeFilter = [];

  // Si la taille de l'entrée est inférieure à 3
  if (inputUser.length < 3) {
    // Vide le tableau (pour éviter les doublons )
    idRecipe = [];
    // Retourne le message suivant
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class='no-result'>Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  // Bouclage pour rechercher dans le titre, la description et vérifier la correspondance, si oui on pousse dans recipeFilter
  console.log(copyRecipes.ingredients)
  const recipeIngredients = copyRecipes.ingredients.map((el) => el.ingredient.toLowerCase())
  for (let i = 0; i < copyRecipes.length; i++) {
    const recipe = copyRecipes[i]
    if (recipe.name.toLowerCase().match(inputUser) || recipeIngredients.match(inputUser) || recipe.description.toLowerCase().match(inputUser)) {
      recipeFilter.push(recipe)
    }
  }

  // Récupération de tous les id de recipeFilter
  for (let j = 0; j < recipeFilter.length; j++) {
    const idOfRecipe = recipeFilter[j].id;
    idRecipe.push(idOfRecipe);
  }

  // Recherche d'une correspondance dans la liste des ingrédients
  for (let k = 0; k < copyRecipes.length; k++) {
    for (let l = 0; l < copyRecipes[k].ingredients.length; l++) {
      const food = copyRecipes[k].ingredients[l].ingredient.toLowerCase();
      // Si l'id correspond à l'id d'une recette, alors on ignore et on passe à l'itération suivante
      if ([...idRecipe].includes(copyRecipes[k].id)) {
        continue;
      }
      // S'il y a une correspondance alors on pousse la recette dans recipeFilter
      if (food.includes(inputUser)) {
        recipeFilter.push(copyRecipes[k]);
      }
    }
  }

  // Si la taille de recipeFilter est vide, alors on affiche le message suivant
  if (recipeFilter.length === 0) {
    return (ELEMENTHTML.containerRecipe.innerHTML = `<p class='no-result'>Aucune recette ne correspond à votre critère ... vous pouvez chercher tarte au pomme ou poisson par exemple</p>`);
  }

  // Fonction qui va créer autant d'éléments que possède recipeFilter
  createElement(recipeFilter);
  // Fonction qui va remplir les cartes de recettes en fonction de recipeFilter
  setIngredients(recipeFilter);
  // Fonction qui va créer les listes d'ingrédient, d'appliance et d'ustensile
  createList(recipeFilter);
};

// Fonction qui va permettre d'afficher les éléments restants en fonction d'un array
export const createList = (array) => {
  // initialisation des arrays
  let listTemporyIngredient = [];
  let listTemporyAppliance = [];
  let listTemporyUstensil = [];

  // Si ces arrays sont vides, alors on vide les tableaux ci-dessus
  if (allIngredients.length !== 0) {
    allIngredients = [];
    allAppliances = [];
    allUstensils = [];
  }

  // Bouclage sur chaque type, un avec tous les ingrédients restants, un avec tous les appliances restants etc...
  for (let recipe = 0; recipe < array.length; recipe++) {
    for (let food = 0; food < array[recipe].ingredients.length; food++) {
      const ingredient = array[recipe].ingredients[food].ingredient.toLowerCase();
      listTemporyIngredient.push(ingredient);
    }

    const appliance = array[recipe].appliance.toLowerCase();
    listTemporyAppliance.push(appliance);

    for (let item = 0; item < array[recipe].ustensils.length; item++) {
      const ustencil = array[recipe].ustensils[item].toLowerCase();
      listTemporyUstensil.push(ustencil);
    }
  }
  // Suppression des doublons en fonction de l'index de l'élément, s'il est égal à l'index en cours on ajoute
  listTemporyIngredient.forEach((element, position) => {
    if (listTemporyIngredient.indexOf(element) === position) {
      allIngredients.push(element);
    }
  });

  listTemporyAppliance.forEach((element, position) => {
    if (listTemporyAppliance.indexOf(element) === position) {
      allAppliances.push(element);
    }
  });

  listTemporyUstensil.forEach((element, position) => {
    if (listTemporyUstensil.indexOf(element) === position) {
      allUstensils.push(element);
    }
  });

  showList(array);
};

// Fonction qui montre les listes
const showList = (array) => {
  // si l'élément ciblé est vide, on vide tout
  if (ELEMENTHTML.listFood.innerHTML) {
    ELEMENTHTML.listFood.innerHTML = '';
    ELEMENTHTML.listItem.innerHTML = '';
    ELEMENTHTML.listUStencil.innerHTML = '';
  }
  // Bouclage pour créer chaque élément restant
  for (let keyIngredient = 0; keyIngredient < allIngredients.length; keyIngredient++) {
    const ingredient = allIngredients[keyIngredient];
    ELEMENTHTML.listFood.innerHTML += `<li class='list-ingredient ing'>${ingredient}</li>`;
  }

  for (let keyAppliance = 0; keyAppliance < allAppliances.length; keyAppliance++) {
    const appliance = allAppliances[keyAppliance];
    ELEMENTHTML.listItem.innerHTML += `<li class='list-appliance object'>${appliance}</li>`;
  }

  for (let keyUstencil = 0; keyUstencil < allUstensils.length; keyUstencil++) {
    const ustencil = allUstensils[keyUstencil];
    ELEMENTHTML.listUStencil.innerHTML += `<li class='list-ustencil ustencil'>${ustencil}</li>`;
  }
  // Fonction qui permet d'ajouter un tag
  choiceInList(array);

  // Fonctions qui permettent d'afficher une liste et de retirer les autres
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
      // On le retire de l'affichage
      el.style.display = 'none';
    }
  });
};

// Permet d'ajouter un tag
const choiceInList = (array) => {
  // Pour chaque élément, si click on appelle la fonction addTag
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
  for (let recipe = 0; recipe < array.length; recipe++) {
    for (let food = 0; food < array[recipe].ingredients.length; food++) {
      const ingredient = array[recipe].ingredients[food].ingredient.toLowerCase();
      if (ingredient.includes(tag.toLowerCase())) {
        // Si oui, on stocke la recette dans stockageTempory
        stockageTemporay.push(array[recipe]);
      }
    }
    // On fait pareil pour les inputs suivants
    const appliance = array[recipe].appliance.toLowerCase();
    if (appliance.includes(tag.toLowerCase())) {
      stockageTemporay.push(array[recipe]);
    }

    for (let item = 0; item < array[recipe].ustensils.length; item++) {
      const ustencil = array[recipe].ustensils[item].toLowerCase();
      if (ustencil.includes(tag.toLowerCase())) {
        stockageTemporay.push(array[recipe]);
      }
    }
  }

  // On pousse le tableau dans historySearch, en cas de retour en arrière, on peut réafficher le resultat de la recherche précédente
  historySearch.push(array);
  // array = stockageTempory
  array = stockageTemporay;
  // Et on affiche autant de recettes que array
  createElement(array);
  setIngredients(array);
  createList(array);
  // Fonction qui permet de supprimer un tag
  [...document.querySelectorAll('.fa-times-circle')].forEach((cross, key) => cross.addEventListener('click', () => removeTag(key, historySearch)));
};

// S'il n'y a pas de tag et de valeur dans la barre principale, alors au click on crée une liste
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
