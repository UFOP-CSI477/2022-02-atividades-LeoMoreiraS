import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import BloodTypes from './components/pages/BloodTypes';
import Cities from './components/pages/Cities';
import CollectionLocations from './components/pages/CollectionLocations';
import Donations from './components/pages/Donation';
import Peoples from './components/pages/People';
import States from './components/pages/States';


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
                <Route path="/doacoes" element={ <Donations/> } />

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;