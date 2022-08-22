import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
//import { Link } from "react-router-dom";
import { filterHealscore, filterType, getAllRecipes,getAllTypes,orderApiDb,orderAz, orderHealthScore, } from '../../Redux/Actions/actions';
import RecipeCard from '../RecipeCard/RecipeCard'
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import { SearchBar } from "../SearchBar/SearchBar";
import style from "./Home.module.css";
import loader from "./giphy.gif" 

export default function Home (){
    const dispatch = useDispatch(); 
    const recipes = useSelector(state => state.alteredRecipes)
    const types = useSelector(state => state.allTypes) 
    const [currentPage, setCurrentPage] = useState(1); 
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipes = currentPage * recipesPerPage; 
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage; 
  
    const currentRecipes = recipes.slice(
      indexOfFirstRecipes,
      indexOfLastRecipes
    );
    
    const [orderaz,setOrderaz] = useState('')

    function handleAz(e){
     dispatch(orderAz(e.target.value))
      setCurrentPage(1)
      setOrderaz(e.target.value)
    }


    const [orderHs,setOrderHs] = useState('')
    
    function handleHs(e){
      dispatch(orderHealthScore(e.target.value))
      setCurrentPage(1)
      setOrderHs(`Ordenado ${e.target.value}`)
    }
    

    const [filterDiet, setFilterDiet] = useState('')

    function handleFilterCreate(e){
      dispatch(orderApiDb(e.target.value))
      setCurrentPage(1)
      setFilterDiet(`Ordenado ${e.target.value}`)
    }

    function handleFilterByType(e){
      dispatch(filterType(e.target.value))
      setCurrentPage(1)
 
    }
    function handleFHs(e){
      dispatch(filterHealscore(e.target.value))
      setCurrentPage(1)
    }
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getAllTypes())
    },[dispatch])


    return(
        
        <div className={style.holeHome}>
          <div className={style.nav}><NavBar/></div>
            
          
          <div className={style.nameDiv}><SearchBar setCurrentPage ={setCurrentPage}/></div>
           
          <div className={style.selectorsdiv}>
            <select className={style.selectors1} defaultValue="Alphabetical Order" onChange={(e)=>handleAz(e)}>
              <option disabled>Alphabetical Order</option>
              <option value= "A-Z">A to Z</option>
              <option value= "Z-A">Z to A</option>
            </select>

            <select className={style.selectors1} defaultValue="Order HealthScore" onChange={(e)=>handleHs(e)}>
              <option disabled>Order HealthScore</option>
              <option value= "min-max">min to max</option>
              <option value= "max-min">max to min</option>
            </select>

          <select defaultValue ="---------"  onChange={(e)=>handleFHs(e)}>
            <option disabled>---------</option>
            <option value="pocosaludable">Poco saludable</option>
          </select>

           <select className={style.selectors2} defaultValue="AllTypes" onChange={e => handleFilterByType(e)}>
              <option disabled value='AllTypes'>AllTypes</option>
                {types.map(t => (<option key={t.id} value={t.name}>{t.name}</option>))}
            </select> 

            <select className={style.selectors2} defaultValue="Ours or Yours" onChange={(e) => handleFilterCreate(e)}>
              <option disabled>Ours or Yours</option>
              <option value="All">All </option>
              <option value="Created">Yours</option>
              <option value="Api">Ours</option>
            </select>
          </div>

        <div>
            <Paginado recipesPerPage={recipesPerPage}
                         recipes={recipes.length}
                         paginado={paginado}
                         paginaActual={currentPage} />
          </div>
          <div className={style.CardsContainer}>
           {
            currentRecipes.length?currentRecipes.map((recipe,recipeIndex)=>{
                return(<RecipeCard
                key = {recipeIndex}
                id= {recipe.id}
                name={recipe.name}
                dishTypes={recipe.dishTypes}
                image={recipe.image}
                types={recipe.types instanceof Object?recipe.types.map(type=>type.name).join(", ")
                  :recipe.types?recipe.types:"No diets"} />)
        }):<div className={style.loader}><img src={loader} alt="CARGANDOOOO"/></div>
        }
          </div>
        </div> 
    )
}