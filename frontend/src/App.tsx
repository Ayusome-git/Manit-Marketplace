import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/HomePage'
import { ThemeProvider } from './components/ui/theme-provider'
import AdminHomePage from './pages/AdminHomePage'
import { ViewProduct } from './pages/ViewProduct'
import { Profile } from './pages/Profile'
import { Layout } from './components/Layout'
import { Products } from './pages/Products'
import { Toaster } from './components/ui/sonner'
import { EditProduct } from './components/EditProduct'
import ChatPage from './components/ChatPage'
import { Seller } from './pages/Seller'

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">

      <BrowserRouter>
        <Toaster richColors={true} position='bottom-right' invert={true} />
        <Routes>
          <Route element={<Layout />} >
            <Route path='/' element={<Homepage />} />
            <Route path='/product/:id' element={<ViewProduct />} />
            <Route path='/profile/:tab' element={<Profile />} />
            <Route path='/products' element={<Products />} />
            <Route path='/edit/:id' element={<EditProduct />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/seller/:id" element={<Seller />} />
          </Route>
          <Route path='/admin' element={<AdminHomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
