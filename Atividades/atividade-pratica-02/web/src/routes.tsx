import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Cities from './components/estados/Cities';
import States from './components/estados/States';


const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>

                <Route path="/" element={ <App /> } />

                <Route path="/estados" element={ <States/> } />
                <Route path="/cidades" element={ <Cities/> } />

            </Routes>
        </BrowserRouter>

    );

}

export default AppRoutes;