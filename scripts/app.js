import { recipes } from './recipe.js'
import { ELEMENTHTML } from './constant.js'
import { createElement, setIngredients } from './function.js'
import { searchByMainInput } from './firstAlgorithm.js'

createElement(recipes)
setIngredients(recipes)

ELEMENTHTML.mainSearch.addEventListener('input', (e) => searchByMainInput(e))
