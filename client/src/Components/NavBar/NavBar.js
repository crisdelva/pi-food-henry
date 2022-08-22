import React from "react";
//import { SearchBar } from "../SearchBar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../Redux/Actions/actions";
import style from "./NavBar.module.css"

export default function NavBar(){
       let dispatch = useDispatch()
        
       function handleRefresh(){
        dispatch(getAllRecipes())
        }

    return(
        
        <div className={style.navDiv}> 
            <Link to="/recipes">
                    <button className={style.navBtn1} onClick={handleRefresh}>I want to see all the recipes again!
                </button>
            </Link>

            <Link to="/create_recipe">
                    <button className={style.navBtn2}> Create Your Own Recipe!!!
                </button>
            </Link>            
        </div>
           
    )
}