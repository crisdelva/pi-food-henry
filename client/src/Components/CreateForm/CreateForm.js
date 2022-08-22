import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, createRecipe } from "../../Redux/Actions/actions";
import style from "./CreateForm.module.css"



function validate(input) {
    let errors = {}
    if (!input.name) errors.name = "it HAS TO HAVE a name... at least";
    if (!(/^[a-zA-Z-\s]+$/).test(input.name)) errors.name = "It's just a name don't overdoit, letters and spaces";
    if (isNaN(input.healthScore)) errors.healthScore = "It has to be at least as nutritive as kick in the face give it a value";
    if (!input.dishTypes) errors.dishTypes = "say something I'm giving up on you..."
    if (input.types.length > 6) errors.types = "It cannot belong to more than 6 diets"
    if (input.summary.length < 30) errors.summary = "humm, maybe some spaces? it should be longer than 30 characters"
    if(!input.healthScore)errors.healthScore = "must be at least a little nutritive";
    return errors
}

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const { allTypes, alteredRecipes } = useSelector(state => state)

    const history = useHistory()

    const [input, setInput] = useState({
        name: "",
        image: "",
        healthScore: "",
        dishTypes: "",
        summary: "",
        steps: "",
        types: []
    })
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const allRecipe = alteredRecipes.map(e => e.name)
        if (!allRecipe.includes(e.target.value)) {

            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(
                validate({
                    ...input,
                    [e.target.name]: e.target.value
                })
            )
        }
    }
    function handleSelect(e) {
        if (!input.types.includes(e.target.value)) {

            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            setErrors(
                validate({
                    ...input,
                    types: [...input.types, e.target.value]
                })
            )
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (
            errors.name ||
            errors.image ||
            errors.dishTypes ||
            errors.healthScore ||
            errors.summary ||
            errors.types ||
            !input.name
        ) {
            alert("hmmmmmmm... Yucky");
        } else {
            dispatch(createRecipe(input))
            alert("Mmm Yummy")

            setInput({
                name: "",
                image: "",
                dishTypes: "",
                healthScore: "",
                summary: "",
                types: []
            })
            history.push("/recipes")
        }
    }
    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(typ => typ !== e)
        })
        setErrors(
            validate({
                ...input,
                types: input.types.filter(typ => typ !== e)
            })
        )
    }


    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])

    return (

        <div className={style.holeForm}>
            <Link to="/recipes"><button className={style.refresh}>I want to se all the recipes again! </button></Link>

            <div className={style.formName}><h1>Create Recipe</h1></div>

            <div className={style.formCard}>
              <form onSubmit={handleSubmit}>
                <div className={style.upperDiv}>
                    <div className={style.div1}>
                        <div>
                            <label>Name: </label>
                            <input type="text" value={input.name} name="name" onChange={handleChange}/>                
                            {errors.name && <p className={style.errorMessages}>{errors.name}</p>}   
                        </div>
                        <div>
                            <label >Image (link): </label>
                            <input type="url" value={input.image} name="image" onChange={handleChange}/>
                        </div>
                        <div>
                            <label>DishTypes:  </label>
                            <input type="string" value={input.dishTypes} name="dishTypes" onChange={handleChange}/>
                            {errors.dishTypes && <p>{errors.dishTypes}</p>}
                        </div>
                    </div>
                
                    <div className={style.div2}>
                        <div className={style.divHS}>
                            <p>{input.healthScore?input.healthScore:0}</p>
                            <label> HealthScore: </label>
                            <input type="range" min="0" max="100.0" defaultvalue={input.healthScore?input.healthScore:1} placeholder="0" name="healthScore" onChange={handleChange}/>
                            {errors.healthScore && <p>{errors.healthScore}</p>}
                        </div>
                        <div>
                            <label> Summary:   </label>
                            <textarea type="text" value={input.summary} name="summary" onChange={handleChange}/>
                            {errors.summary && <p>{errors.summary}</p>}
                        </div>
                        <div>
                            <label> Steps:  </label>
                            <textarea type="text" value={input.steps}name="steps"onChange={handleChange}/>
                            {errors.steps && <p>{errors.steps}</p>}
                        </div>
                    </div>
                </div>
                <div className={style.bottomDiv}>
                <div className={style.div3}> 
                     <label>Select its Diets: </label>
                        <select onChange={e => handleSelect(e)} defaultValue="Select diets">
                           <option disabled>Select diets</option>
                            {allTypes.map((t, ti) => (
                            <option key={ti} value={t.name}> {t.name}</option>))}
                        </select>
                    </div>
                </div> 
                    <div className={style.createBtn}><button type='submit'>Create Recipe </button></div>

                
                </form>
            

                <div className={style.typesForm}>
                  {input.types.map((e,index) =>
                    <div key={index} className={style.selectedDiet}>    <p>{e}</p>
                    <button onClick={()=>handleDelete(e)}>x</button>
                    </div>)}
                    <div className={style.error}>{errors.types && <p>{errors.types}</p>}</div>
                </div>
            </div> 
              
        </div>
    )
}