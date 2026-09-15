import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './App.css'

import { AllProvider } from './providers/AllProvider'
import PageHome from './pages/home/PageHome'
import PageLogin from './pages/login/PageLogin'
import PageRegister from './pages/register/PageRegister'
import PageSearchResults from './pages/searchResults/PageSearchResults'
import PageBook from './pages/book/PageBook'
import { UseUserContext } from './providers/UserProvider'

export default function App() {
  return (
    <BrowserRouter>
      <AllProvider>
        <Routes>
          <Route path='/'> 
            <Route index element={<Navigate to='/home' replace/>}/> 
            <Route path='/home' element={<PageHome />} />
            <Route path='/login' element={<PageLogin />} />
            <Route path='/register' element={<PageRegister />} />
            <Route path='/search/:query/:page' element={<PageSearchResults />} />
            <Route path='/book/:key' element={<PageBook />} />
          </Route>
        </Routes>
      </AllProvider>
    </BrowserRouter>
  )
}
