import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import AdminHomePage from './pages/AdminHomePage'
import { PostProduct } from './pages/PostProduct'
import { ViewProduct } from './pages/ViewProduct'
import { Profile } from './pages/Profile'

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/admin' element={<AdminHomePage/>}/>
        <Route path='/product/:id' element={<ViewProduct/>}/>
        <Route path='/profile/:tab' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
