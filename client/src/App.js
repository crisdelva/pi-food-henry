import './App.css';
import {Route, Switch} from "react-router-dom"
import LandingPage from "./Components/LandingPage/LandingPage"
import Home from './Components/Home/Home'
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';
import CreateForm from './Components/CreateForm/CreateForm'

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component = {LandingPage}/>
      <Route path = "/recipes" component= {Home}/>
      <Route path = "/recipe/:id" component= {RecipeDetail}/>
      <Route path = "/create_recipe" component={CreateForm}/>
    </Switch>
    
    </div>
  );
}

export default App;
