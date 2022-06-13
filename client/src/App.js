import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingPage';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import CreatePoke from './Components/CreatePoke/CreatePoke';
import ModifPoke from './Components/ModifPoke/ModifPoke';
import PokeDetails from './Components/Pokes/PokeDetails';
import Listados from './Components/Listado';
//import FootBar from './Components/FootBar/FootBar';

function App() {
  return (
    <div className="App">
      
      <Route exact path={'/'} component={LandingPage}/>
      <Route path={'/home'} component={Home}/>
      <Route path={'/about'} component={About}/>
      <Route path={'/create'} component={CreatePoke}/>
      <Route path={'/modif'} component={ModifPoke}/>
      <Route path={'/details/:id'} component={PokeDetails}/>
      <Route path={'/listado'} component={Listados}/>
      
    </div>
  );
}

export default App;
