import React from "react";
import { Link } from "react-router-dom";
import style from "./RecipeCard.module.css"



export default function RecipeCard({id,name,dishTypes,image,types}){
    return(

        <div className={style.card} style={{ backgroundImage: `url("${image}")`}}>
            <Link to={`/recipe/${id}`}>
                <div className={style.cardContent}>
                <h3 className={style.cardName}>{name}</h3> 
                <div className={style.contCard}>
                    <h4 className={style.cardDish}>{dishTypes}</h4>
                    <h5 className={style.cardTypes}>{types?types:"no diet"}</h5>
                </div>
            </div></Link>
        </div>
    )
}