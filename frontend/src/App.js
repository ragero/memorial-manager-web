import './App.css';
import 'fontsource-roboto';
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from './template/Logo'
import Menu from './template/Menu'
import Footer from './template/Footer'
import Home from './paginas/Home'

function App() {
  return (
    <div className="app">
      <Logo/>
      <Menu/>
      <Home/>
      <Footer/>
    </div>
    
  );
}

export default App;
