import axios from "axios"

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_SEARCH_NAME = "GET_SEARCH_NAME";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CLEAN_DATA = "CLEAN_DATA";
export const ORDERAZ = "ORDERAZ";
export const ORDERHS = "ORDERHS";
export const FILTERDIET= "FILTERDIET";
export const ORDERAPIDB = "ORDERAPIDB";
export const FILTERHS= "FILTERHS";

export function getAllRecipes() {
    return async function (dispatch) {
        try {
            let data = await axios("/recipes")
            return dispatch({ type: GET_ALL_RECIPES, payload: data.data })
        }
        catch (error) {
            alert("change the apiKey");
        }
    }
}

export function getRecipeDetail(id) {
    return async function (dispatch) {
        try {
            if (id) {
                let data = await axios(`/recipes/${id}`)
                return dispatch({type: GET_RECIPE_DETAIL, payload: data.data })
                
            } else {
                dispatch({ type: GET_RECIPE_DETAIL, payload: id })
            }
        }
        catch (error) {
            alert("Hmm... seems like we lost that recipe")
        }
    }
}

export function getAllTypes() {
    return async function (dispatch) {
        try {
            let data = await axios("/diets")
            return dispatch({ type: GET_ALL_TYPES, payload: data.data })
        }
        catch (error) {
            alert("You broke your diet bro, no shame though")
        }
    }
}

export function searchRecipeName(name) {
    return async function (dispatch) {
        try {
            let data = await axios(`/recipes?name=${name}`)
            return dispatch({type:GET_SEARCH_NAME, payload:data.data})
        } catch (error) {
            alert("We dont have that recipe... you could create it though")
        }
    }
}

export function createRecipe(payload){
    return async function(){
        let data = await axios.post("/recipe",payload)
        return data;
    }
}

export function filterHealscore(payload){
    return{type:FILTERHS,payload}
}

export function cleanData() {
    return { type: CLEAN_DATA, payload: {} }
}

export function orderAz(payload){
    return { type:ORDERAZ, payload }
}

export function filterType(payload){
    return {type: FILTERDIET, payload}
}

export function orderHealthScore(payload){
    return {type:ORDERHS, payload}
}

export function orderApiDb(payload){
    return {type:ORDERAPIDB, payload}
}