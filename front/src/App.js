import React from 'react'; //{useState}
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminRouter from './pages/adminPages/AdminRouter';
import AdminLayout from './pages/adminPages/AdminLayout';
//import PupblicLayout from './pages/publicPages/PupblicLayout';
import PublicLayoutAdmin from './pages/publicPages/PublicLayoutAdmin';
import PublicRouterAdmin from './pages/publicPages/PublicRouterAdmin';
import PublicRouter from './pages/publicPages/PublicRouter';
import AuthRouter from './pages/auth/AuthRouter';

//permet de protéger les routes qui ont besoin de authentification
import AuthGuard from './_helpers/AuthGuard';

//importa des fonctions du context
import { ManagePopopContextFunction } from './_utils/contexts/ContextManagePopop';
import { ContextDatasFunction } from './_utils/contexts/ContextDatas';

function App() {
  return (

      <ContextDatasFunction>
      <ManagePopopContextFunction>

        <BrowserRouter>
          <Routes>

            {/*sans layout juste avec  router */}
            <Route path='/auth/*' element={<AuthRouter/>} />
            <Route path='/*' element={<PublicRouter/>} />

            {/*Avec Layout car on y accède après une authentification */}
            <Route element={<AdminLayout/>}>
              <Route path="/admin/*" element={
                
                <AuthGuard>
                  <AdminRouter/>
                </AuthGuard>
              
              }/>
            </Route> 
            <Route element={<PublicLayoutAdmin/>}>
              <Route path="/visitor/*" element={
              
              <AuthGuard>
                <PublicRouterAdmin/>
              </AuthGuard>
                
              }/>
            </Route> 

          </Routes>
        </BrowserRouter>

      </ManagePopopContextFunction>
      </ContextDatasFunction>
   
  );
}

export default App;
