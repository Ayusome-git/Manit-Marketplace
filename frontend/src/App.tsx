import './App.css'
import { Login } from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
