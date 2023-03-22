import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Cities from './components/estados/Cities';
import CreateState from './components/estados/CreateStates';
import ListEstados from './components/estados/ListEstados';


const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>

                <Route path="/" element={ <App /> } />

                <Route path="/estados" element={ <><CreateState/><ListEstados /></> } />
                <Route path="/cidades" element={ <Cities/> } />

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;