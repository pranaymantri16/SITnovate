import { Route, Routes } from 'react-router-dom'
import UniversityRegistration from './Auth/Signup'
import HomePage from './Pages/Home'
import Signin from './Auth/Signin'
import Access from './Context/Access'
import CertificateUpload from './Pages/uploadForm'
import StudentRegistration from './Student/Signup'
import StudentLogin from './Student/Signin'
import HomePages from './Student/Home'
import Form from './Student/Form'

function App() {

  return (
    <>
    <Routes>
      <Route path='/signup' element={<UniversityRegistration/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='uni' element={<Access/>}>
      <Route path='/uni/home' element={<HomePage/>}/>
      <Route path='/uni/upload' element={<CertificateUpload/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
