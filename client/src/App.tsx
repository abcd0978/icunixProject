import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Index from './Pages/Index'
import Footer from './components/Footer/Footer';
import Temp from './Pages/temp';
function App() {
  return (
    <div className="App" style={{minWidth:'600px'}}>
      <BrowserRouter>
        <Header/>
          <hr />
          <Routes>
            <Route path='/' element={<Index/>} />
            <Route path='/temp' element={<Temp/>}/>
          </Routes>
          <hr />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
