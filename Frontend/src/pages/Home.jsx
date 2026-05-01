import Header from "../components/Header"
import SideBar from "../components/SideBar"
import Hero from "../components/Hero"
import { Outlet } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../context/UserContext"


const Home = () => {

  const {openSidebar} = useContext(UserContext)
  
  return (
    <>
    <Header/>
    <SideBar/>
    <div className="min-h-screen max-w-screen bg-linear-to-r from-sky-200 to-sky-100 backdrop-blur-3xl 
    flex justify-center items-center pt-12 pb-10">
        {/* sidebar */}
      
      <div className={`min-h-screen w-full  ${openSidebar && "ml-[25%]"} flex flex-col justify-center items-center`}>
        <Outlet/>
      </div>
      
  
    </div>
    </>
)

}

export default Home