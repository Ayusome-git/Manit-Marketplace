import './App.css'
import { Login } from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import AdminHomePage from './pages/AdminHomePage'
import { PostProduct } from './pages/PostProduct'
import { ViewProduct } from './pages/ViewProduct'

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<AdminHomePage/>}/>
        <Route path='/postad' element={<PostProduct/>}/>
        <Route path='/product/:id' element={<ViewProduct/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
