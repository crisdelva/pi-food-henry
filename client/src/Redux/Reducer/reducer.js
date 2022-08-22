
import {FILTERHS, GET_ALL_RECIPES, GET_RECIPE_DETAIL, CLEAN_DATA, GET_SEARCH_NAME, GET_ALL_TYPES, ORDERAZ, ORDERHS, ORDERAPIDB, FILTERDIET } from "../Actions/actions";

let initialState = {
    alteredRecipes:[],
    allRecipes: [],
    recipeDetail: {},
    allTypes: [],
}

let rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RECIPES:

            return{ ...state, allRecipes: action.payload,
                    alteredRecipes:action.payload}

        case GET_RECIPE_DETAIL:

            return{ ...state, recipeDetail: action.payload }

        case GET_ALL_TYPES:

            return{ ...state, allTypes: action.payload }

        case GET_SEARCH_NAME:

            return{ ...state, alteredRecipes:action.payload }

        case CLEAN_DATA:

            return{ ...state,recipeDetail:action.payload}
        
     
        case FILTERHS:

            let dato = state.allRecipes;
            let filtereddato = action.payload ==="pocosaludable"? dato.filter(e =>e.healthScore<65):null;
            return{...state,alteredRecipes:filtereddato}

        case FILTERDIET:

            let diets = state.allRecipes;
            let filterDiets = action.payload ==="AllTypes"?
            diets:diets.filter(recipe =>recipe.types.includes(action.payload))
            return{...state,alteredRecipes:filterDiets};

        case ORDERAZ:

            let orderAz = action.payload === "A-Z"? state.alteredRecipes.sort(function(a,b){
                if (a.name > b.name) return 1; 
                if (b.name > a.name) return-1;
                return 0;
            }):state.alteredRecipes.sort(function(a,b){
                if (a.name > b.name) return -1; 
                if (b.name > a.name) return  1;
                return 0;
            });
            return {...state,alteredRecipes:orderAz};
        
        case ORDERHS:

            let orderHs = action.payload === "min-max"? state.alteredRecipes.sort(function(a,b){
                if (a.healthScore > b.healthScore) return 1 
                if (b.healthScore > a.healthScore) return-1
                return 0
            }):state.alteredRecipes.sort(function(a,b){
                if (a.healthScore > b.healthScore) return -1 
                if (b.healthScore > a.healthScore) return  1
                return 0
            })
            return {...state,alteredRecipes:orderHs};            
        
        case ORDERAPIDB:

            let allCreated = state.allRecipes;
            let db = action.payload === "Created"?allCreated.filter(recipe=>typeof recipe.id === "string")
            :allCreated.filter(recipe =>typeof recipe.id === "number");
            return {...state,alteredRecipes:action.payload ==="All"? state.allRecipes:db}
        default:
            return {...state};
    }
}
export default rootReducer