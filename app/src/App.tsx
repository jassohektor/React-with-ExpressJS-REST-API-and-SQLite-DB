import logo from './assets/logo.svg';
//import { Header, Footer, axiosClient} from '@core';
//import { Button } from '@ui';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './core/contexts/Context';

import Profile from './features/pages/Profile';
import { Header, Footer } from './core/components';
import { Login } from './shared/components/loginModal';
import { Home } from './features/components';

function App() {
  return (
  <div className='app-title'>
    <ContextProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/my-profile' element={<Profile/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ContextProvider>
  </div>
  );
}

export default App;
