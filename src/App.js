import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Bienvenida from './componentes/bienvenida/Bienvenida'
import Conteo from './componentes/conteo/Conteo'

function App() {
  return (
    <div className="App">
      <div className="carita carita_amarilla"></div>
      <div className="carita carita_amarilla_little"></div>
      <div className="carita carita_verde"></div>
      <div className="carita carita_verde_big"></div>
      <div className="carita carita_azul"></div>
      <div className="carita carita_morado"></div>
      <div className="carita carita_morado_little"></div>
      <div className="carita carita_roja"></div>
      <div className="programacion"></div>
      <div className="tienda_fep"></div>
      <div className="logos_footer"></div>
      <Router>
        {/* Cada componente se encuentra en la carpeta de 'componentes'*/}
        <Switch>
          <Route exact path="/" component={Bienvenida} />
          <Route path="/count" component={Conteo} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
