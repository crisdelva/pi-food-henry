import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanData, getRecipeDetail } from "../../Redux/Actions/actions";
import NavBar from "../NavBar/NavBar";
import style from "./RecipeDetail.module.css";
//import { Link } from "react-router-dom";
import loader from "./giphy.gif"
export default function RecipeDetail() {
    const dispatch = useDispatch();
    const recipeDetail = useSelector(state => state.recipeDetail)
    const { id } = useParams();


    useEffect(() => {
        dispatch(getRecipeDetail(id))
        return (dispatch(cleanData()))
    }, [dispatch, id])


    
    return (
        <div className={style.holeRecipe}>
            <div className={style.nav}><NavBar /></div>
            {Object.keys(recipeDetail).length ? ((
                
                <div className={style.recipeDetail}>
                <h2>{recipeDetail.name}</h2>
                <img src={recipeDetail.image} alt={recipeDetail.name} />
                <h3>Diet types: {recipeDetail.types[0] instanceof Object?recipeDetail.types.map(type=>type.name).join(", ")
                :recipeDetail.types[0]?recipeDetail.types:"No diets"}</h3>
                <h4>Healthscore: {recipeDetail.healthScore}</h4>
                <h4>Dishtype: {recipeDetail.dishTypes}</h4>
                <div className={style.sumDiv}><p>{recipeDetail.summary?recipeDetail.summary.replace(/<[^>]+>/g, ''):
                "This is awkward, we cant describe it, must be marvelous"}</p></div>
                <div className={style.stepDiv}><ol>Step by step:<br />
                    {recipeDetail.steps instanceof Array ?
                        recipeDetail.steps.map((st, stindex) => {
                            return (
                                <li key={stindex}
                                    number={st.number}>
                                    {st.step}
                                </li>

                            )
                        }) : recipeDetail.steps?recipeDetail.steps:"Maybe you could improvise "}</ol></div>
            </div>)) : <div className={style.loader}><img src={loader} alt="CARGANDOOOO"/></div>}
        </div>
    )
}