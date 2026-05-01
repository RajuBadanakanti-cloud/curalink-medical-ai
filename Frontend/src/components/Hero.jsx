import { Send } from "lucide-react";
import { useContext, useState } from "react";
import AIResponse from "./AIResponse";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const quickSearches = [
  {id:1, disease: "💉 Diabetes", query: "Latest treatments for type 2 diabetes" },
  {id:2, disease: "🫁Lung Cancer", query: "Targeted therapies for lung cancer" },
  {id:3, disease: "🫀Hypertension", query: "Best treatments for high blood pressure" },
  {id:4, disease: "🧠Alzheimer's Disease", query: "New therapies for Alzheimer's disease" },
  {id:5, disease: "⚕️Parkinson's Disease", query: "Current treatment options for Parkinson's disease" },
  {id:6, disease: "🎗 Breast Cancer", query: "Latest advancements in breast cancer treatment" }


] 


const Hero = () => {

    const [disease, setDisease] = useState("")
    const [query, setQuery] = useState("")
    const {setQueries, autoFocused, openSidebar, setOpenSidebar} = useContext(UserContext)


    

// FORM  Submition >>
  
const navigation = useNavigate()

const handleFormSubmition = (event) => {
        event.preventDefault()

        const userQuery = {
            disease,
            query
        }

        const userQueriesToTab = {
            disease,
            query,
            time: new Date().toISOString()
        }

        setQueries((prev) => [...prev, userQueriesToTab])
        navigation("/chat", { state: userQuery })

}



    return (
        <div className={`min-h-screen ${openSidebar ? "w-[80%]" : "w-[90%]"} flex flex-col justify-center items-center pt-10 md:pt-0`}
        onClick={(e) => {

            if(window.innerWidth < 640){
                   setOpenSidebar(false),
                    e.stopPropagation()
            }
        }
            }>
            <div className="h-full w-full  mb-5 md:mb-6 flex flex-col justify-center items-start ">
                {/* Title and description */}
                <section className="flex flex-col items-center text-center">
                <h1 className="text-xl md:text-4xl font-bold font-sans text-slate-800 mb-4">
                Well come to <span className="text-sky-800">Curalink</span>
                </h1>
                <p className="w-[95%] md:w-[90%] text-xs md:text-lg text-slate-700 font-sans">
                  Ask Medical AI questions about diseases, treatments, and clinical research. 
                    Our AI analyzes trusted research papers and clinical trials to provide 
                    evidence-based medical insights and recommendations.
                </p>
                </section>
            {/* Quick serches */}    
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mt-10 mb-10">
                {quickSearches.map(each => (
                    <li key={each.id} onClick={() => {setDisease(each.disease.replace(/[^a-zA-Z\s]/g,"")), setQuery(each.query)}}
                     className=" bg-linear-to-r from-sky-50 to-sky-100 border border-sky-300 rounded-xl backdrop-blur-2xl shadow-xl shadow-sky-200/80 px-4 py-3 
                    scale-100 cursor-pointer transform transition-transform duration-300 ease-out
                    hover:scale-105 hover:border-2 focus:ring-2 focus:ring-sky-500">
                        <h2 className="text-slate-800 text-sm md:text-base font-bold">{each.disease}</h2>
                        <p className="text-slate-600 text-[9px] md:text-[10px] font-sans">{each.query}</p>
                    </li>
                ))}
            </ul>

            <form id="med-form" className="w-full md:w-fit rounded-2xl text-sm md:text-base" onSubmit={handleFormSubmition}>
      
            <input id="disease" autoFocus={autoFocused} type="text" placeholder="ex: Brain Strock (use from above)" required
            value={disease} onChange={(event) => setDisease(event.target.value)}
            className="h-12 px-5 py-4 w-[90%] bg-sky-50 border border-sky-400 rounded-xl outline-none mr-4 
            placeholder-slate-400 mb-4"/>

          
            <input id="query" type="text" placeholder="ex: Give a Best treatment  ( if use Quick search from above )" required
                value={query} onChange={(event) => setQuery(event.target.value)}
                className="h-12 px-5 py-4 w-[90%] bg-sky-50 border border-sky-400  rounded-xl outline-none mr-4
                placeholder-slate-400 mb-5"/>

            <button type="submit"
                className=" h-12 w-18 bg-cyan-400/80 shadow-lg shadow-cyan-200 rounded-xl flex justify-center items-center cursor-pointer 
                group scale-100 hover:scale-105 hover:shadow-cyan-300 transform transition-all duration-200">
                <Send className="h-4 w-4 group-hover:rotate-45 transform transition-transform duration-200"/>
            </button>
      
            </form>
            </div>

        
        </div>


    )
}    


export default Hero