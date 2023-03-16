import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import CreateCities from './components/estados/CreateCities';
import CreateState from './components/estados/CreateStates';
import ListCities from './components/estados/ListCities';
import ListEstados from './components/estados/ListEstados';


const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>

                <Route path="/" element={ <App /> } />

                <Route path="/estados" element={ <><CreateState/><ListEstados /></> } />
                <Route path="/cidades" element={ <><CreateCities/> <ListCities /></> } />

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;