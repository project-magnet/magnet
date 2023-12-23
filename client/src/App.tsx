import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div>   
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Login" Component={Login} />  
     </Routes>
  </div>
  );
}

export default App;
