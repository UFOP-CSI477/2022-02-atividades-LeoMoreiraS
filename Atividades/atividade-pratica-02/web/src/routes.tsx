import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import BloodTypes from './components/estados/BloodTypes';
import Cities from './components/estados/Cities';
import CollectionLocations from './components/estados/CollectionLocations';
import Peoples from './components/estados/People';
import States from './components/estados/States';


const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>

                <Route path="/" element={ <App /> } />

                <Route path="/estados" element={ <States/> } />
                <Route path="/cidades" element={ <Cities/> } />
                <Route path="/tipoSanguineo" element={ <BloodTypes/> } />
                <Route path="/coleta" element={ <CollectionLocations/> } />
                <Route path="/pessoas" element={ <Peoples/> } />

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;