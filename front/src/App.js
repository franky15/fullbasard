import React from 'react'; //{useState}
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminRouter from './pages/adminPages/AdminRouter';
import AdminLayout from './pages/adminPages/AdminLayout';
import PublicRouter from './pages/publicPages/PublicRouter';
import AuthRouter from './pages/auth/AuthRouter';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/auth/*' element={<AuthRouter/>} />
          <Route path='/*' element={<PublicRouter/>} />

          <Route element={<AdminLayout/>}>
            <Route path="/admin/*" element={
            
              <AdminRouter/>
            }/>
          </Route> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
