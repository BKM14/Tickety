import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserDash from './pages/UserDash'
import AdminDash from './pages/AdminDash'
import Landing from './pages/Landing'

function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/user' element={<UserDash />}></Route>
          <Route path='/admin' element={<AdminDash />}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
