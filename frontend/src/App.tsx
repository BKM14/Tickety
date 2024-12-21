import { MantineProvider } from '@mantine/core'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserDash from './pages/UserDash'
import AdminDash from './pages/AdminDash'


function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/user' element={<UserDash />}></Route>
          <Route path='/admin' element={<AdminDash />}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
