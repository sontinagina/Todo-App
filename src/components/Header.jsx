import React from 'react'
// import logo from '../components/assests/todologo.png'
import logo from '../assests/images/mono.png'
const Header = () => {
  return (
   <header className="header">
     <nav>
       <div className="logo">
         <img src={logo} alt="image"></img>
       </div>
     </nav>

   </header>
  )
}

export default Header
