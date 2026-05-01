import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const Header = () => {

    const [scolled, setScolled] = useState(false)

    useEffect(() => {

        const handleScrollNavbar = () => {

            if(window.scrollY > 100){
                setScolled(true)
            }else{
                setScolled(false)
            }
        }

        window.addEventListener("scroll", handleScrollNavbar)
        return () => window.removeEventListener("scroll", handleScrollNavbar)

    }, [])
    
    return (
    <header className={`h-18 w-screen px-5 md:px-10 py-2 md:py-5 backdrop-blur-lg  fixed top-0 left-0 z-50 transition-colors duration-300 ease-in-out
        flex flex-row justify-between items-center
    ${scolled ? `bg-linear-to-r from-sky-100 to-sky-200 shadow-md`  : `bg-sky-100/60 shadow-sky-200 shadow-2xl`  } `}>
        <div className="w-[95%] md:w-[90%] flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
            <nav className="flex justify-center items-center">
                <button className="px-2 py-1 md:px-3 md:py-2  bg-cyan-400/80 shadow-lg shadow-cyan-300 rounded-xl mr-4 text-xl">🧬</button>
                <div className="flex flex-col justify-center items-start">
                    <h1 className="font-bold font-mono text-sm md:text-xl tracking-wide">CURALINK</h1>
                    <span className="text-[6px] md:text-xs">Ai Powered Medical</span>
                </div>
            </nav>
            </Link>

            {/* navigation-links */}
            <section className="flex justify-between items-center text-slate-900 font-semibold">
                <Link to="/">
                <nav className="mr-2 md:mr-5 hover:bg-sky-400 px-2 py-0.5 md:px-5 md:py-1 rounded-sm md:rounded-xl text-xs md:text-base transition-all duration-300 cursor-pointer ease-linear">Home</nav>
                </Link>
                 <nav className="hidden md:flex mr-5 hover:bg-sky-400 px-5 py-1 rounded-xl text-base transition-all duration-300 cursor-pointer">Profile</nav>
                 
            </section>

        </div>
    </header>
)

}

export default Header