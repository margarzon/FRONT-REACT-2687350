import React,{Fragment} from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom'
import Navbar from './paginas/auth/navbar';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/"exact element={<Navbar/>}>
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;