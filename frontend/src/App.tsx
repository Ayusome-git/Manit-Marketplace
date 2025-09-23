import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import AdminHomePage from './pages/AdminHomePage'
import { ViewProduct } from './pages/ViewProduct'
import { Profile } from './pages/Profile'
// import { AdminRoutes } from './routes/AdminRoutes'
import { Layout } from './components/Layout'
import { Products } from './pages/Products'
import { Toaster } from './components/ui/sonner'
import { EditProduct } from './components/EditProduct'

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
    
    <BrowserRouter>
    <Toaster richColors={true} position='bottom-right' invert={true}/>
      <Routes>
        {/* admin routes */}
        {/* {AdminRoutes} */}
        <Route element={<Layout />} >
            <Route path='/' element={<Homepage />} />
            <Route path='/admin' element={<AdminHomePage />} />
            <Route path='/product/:id' element={<ViewProduct />} />
            <Route path='/profile/:tab' element={<Profile />} />
            <Route path='/products' element={<Products />} />
            <Route path='/edit/:id' element={<EditProduct />} />
          </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
