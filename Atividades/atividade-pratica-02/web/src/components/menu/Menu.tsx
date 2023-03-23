import { Link } from 'react-router-dom';
import './menu.css'

const Menu = () => {

    return(
        <div>
            <h2>Menu</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/estados">Estados</Link></li>
                <li><Link to="/cidades">Cidades</Link></li>
                <li><Link to="/tipoSanguineo">Tipo Sanguíneo</Link></li>
                <li><Link to="/coleta">Locais de Coleta</Link></li>
            </ul>
        </div>
    );

}

export default Menu;