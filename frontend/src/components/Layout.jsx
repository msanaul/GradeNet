import { Outlet } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'
import Footer from './Footer'
function Layout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout