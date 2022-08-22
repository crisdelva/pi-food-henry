import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";


export default function LandingPage() {
    return (
        <div className={style.landing}>
            
            <div className={style.backgroundCard}>
                <div className={style.opac}>
                    <div className={style.cardShadow}>
                        <div className={style.landingCard}>
                            <div className={style.content}> <h2 className={style.title}>Reciparium</h2>
                                <div className={style.btnLink}>
                                <Link to="/recipes">
                                    
                                <div><button> --- Let's see--- </button></div>
                                </Link>
                            </div>
                            <p className={style.welcome}>Welcome to my project,<br />
                                    you'll find a lot of ideas,<br />
                                    for you to eat or you could<br />
                                    create some recipes yourself</p>
                            </div>
                            
                        </div>
                    </div> </div>
            </div>
            <footer>foooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooterrrrrrrrrrrrrrrrrrrrrrrrrrr</footer>
        </div>
    )
}