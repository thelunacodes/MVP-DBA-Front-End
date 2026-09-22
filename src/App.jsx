import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import PageHome from './pages/home/PageHome'
import PageLogin from './pages/login/PageLogin'
import PageRegister from './pages/register/PageRegister'
import PageSearchResults from './pages/searchResults/PageSearchResults'
import PageBook from './pages/book/PageBook'

import './App.css'
import ProviderWrapper from './Providers/ProviderWrapper'
import ModalBase from './components/ModalBase/ModalBase'

export default function App() {
  return (
    <BrowserRouter>
      <ProviderWrapper>
        <ModalBase />

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
      </ProviderWrapper>
    </BrowserRouter>
  )
}
