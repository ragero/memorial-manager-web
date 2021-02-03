import './App.css';
import 'fontsource-roboto';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import Roteador from './Roteador'
import Logo from '../template/Logo'
import Menu from '../template/Menu'
import Footer from '../template/Footer'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Logo/>
        <Menu/>
        <Roteador/>
        <Footer/>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
