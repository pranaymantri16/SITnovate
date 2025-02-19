import { Route, Routes } from 'react-router-dom'
import UniversityRegistration from './Auth/Signup'
import HomePage from './Pages/Home'
import Signin from './Auth/Signin'
import Access from './Context/Access'

function App() {

  return (
    <>
    <Routes>
      <Route path='/signup' element={<UniversityRegistration/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='uni' element={<Access/>}>
      <Route path='/uni/home' element={<HomePage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
