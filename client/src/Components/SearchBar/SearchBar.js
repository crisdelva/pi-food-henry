import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import {  searchRecipeName } from "../../Redux/Actions/actions";
import style from "./SearchBar.module.css"

export function SearchBar(props){
    const dispatch = useDispatch();
    const [currentSearch, setCurrentsearch] = useState('')
    const {setCurrentPage} = props
    
    function handleChange(e){
        e.preventDefault();
        setCurrentsearch(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()

        dispatch(searchRecipeName(currentSearch))
        setCurrentsearch('');
        setCurrentPage(1)
    }

    return(
        <div className={style.searchDiv} onSubmit={handleSubmit}>
                <form>
                    <input type="text" className={style.srcIn}
                    placeholder="Recipe Search..."
                    value={currentSearch} onChange={handleChange}
                    />
                <button className={style.srcBtn} onClick={handleSubmit} type='submit' value=''>🔍</button>
                </form>
        </div>
    )
}