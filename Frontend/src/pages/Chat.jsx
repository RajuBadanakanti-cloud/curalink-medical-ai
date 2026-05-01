import axios from "axios"
import { useContext, useEffect, useState, } from "react"
import { useLocation } from "react-router-dom"
import SideBar from "../components/SideBar"

import { User, Globe, Calendar, ExternalLink, BookOpen, BarChart2, Syringe, MapPin} from "lucide-react"
import UserContext from "../context/UserContext"

const Chat = () => {

    const location = useLocation() // getting query from Hero page
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [expandedIndex, setExpandedIndex] = useState(false)
    const {setOpenSidebar} = useContext(UserContext)


// Geting Ai Response from Backend
useEffect(() => {
  const fetchingAiResponse = async () => {
    try {
      setLoading(true);
      setResult(null); // ✅ clear old data

      const userQuestion = location.state || {};

     
      const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
      const response = await axios.post(`${URL}/api/query`, userQuestion);

      setResult(response.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  if (location.state) {
    fetchingAiResponse();
  }
}, [location.state]);

    console.log(result)


// Server Error content >>
const renderServerProblem = () => (

  <div className="w-[95%] md:max-w-[80%] flex justify-center items-center ">

    <div className="bg-sky-50 border border-sky-200 rounded-xl shadow-md p-6 max-w-xl text-center">

      <div className="text-xl md:text-4xl mb-2">⚠️</div>

      <h2 className="text-sm md:text-lg font-semibold text-red-600 mb-2">
        Server is temporarily unavailable
      </h2>

      <p className="text-[10px] md:text-sm text-slate-600 mb-4">
        The AI service is currently busy or rate limited. 
        Please try again in a few minutes.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="bg-slate-500 hover:bg-slate-600 text-white text-sm md:text-base px-5 py-2 rounded-lg transition"
      >
        Retry
      </button>

    </div>

  </div>

)

// papaers content >>
const renderPapersContent = () => {

    if(!result?.papers) return null

    return (

            <div className="max-w-full md:max-w-[90%] rounded-xl flex flex-col justify-start items-start p-4">

                {/* Papers Title */}
                <h2 className="text-sm md:text-xl font-bold mt-5 md:mt-5 mb-4 text-slate-800 flex items-center">
                📑 Top Research Papers
                </h2>

                {/* Papers Grid */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full">

                    {result.papers.map((each, index) => (
                        <li
                        key={index}
                            className="bg-sky-50 border border-sky-100 px-3 py-3 md:px-5 md:py-5 shadow-md rounded-xl
                            hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                            {/* Header */}
                            <section className="flex flex-col md:flex-row items-start md:items-center flex-wrap space-x-3">
                                {/* Source Badge */}
                                <span className="flex justify-center items-center text-[10px] md:text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">
                                    <Globe className="h-2 w-2 md:h-3 md:w-3 mr-0.5 md:mr-1"/>
                                    {each.source}
                                </span>

                                {/* Year */}
                                <span className="flex items-center text-[10px] md:text-xs text-slate-600 ml-3">
                                    <Calendar className="md:h-3 h-2 w-2 md:w-3 mr-0.5 md:mr-1"/>
                                    {each.year}
                                </span>

                                {/* Citations */}
                                <span className="flex items-center text-[10px] md:text-xs text-slate-600 ml-3">
                                    <BarChart2 className="h-2 md:h-3 w-2 md:w-3 mr-0.5 md:mr-1"/>
                                    {each.citations} citations
                                </span>

                            </section>
                            {/* Title */}
                            <h3 className="text-slate-900 text-xs md:text-sm font-semibold leading-snug  mt-2 mb-3">
                                {each.title}
                            </h3>

                            {/* DOI Link */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <a
                                href={each.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 text-xs md:text-sm hover:underline mb-2 md:mb-0">
                                View Research
                                <ExternalLink className="h-3 w-3 ml-1"/>
                            </a>


                        {result?.pubmed?.[index] && (
                        <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${result.pubmed[index]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-green-600 text-xs md:text-sm hover:underline"
                        >
                            PubMed
                            <ExternalLink className="h-3 w-3 ml-1"/>
                        </a>
                        
                        )}
                        </div>

                

                        </li>
                    ))}

                </ul>

            </div>
        
    )
}


// clinical trails >>
const renderClinicalTrails = () => {
    return (
    <div className="max-w-full md:max-w-[90%] rounded-xl flex flex-col justify-start items-start p-4">

        {/* Papers Title */}
        <h2 className="text-sm md:text-xl font-bold mb-4 text-slate-800 flex items-center">
            💉Top Clinical Trials
        </h2>

        <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {result?.trials?.map((each, index) => {
            const isExpanded = expandedIndex === index;

            const summaryText = isExpanded
                ? each.summary
                : each.summary?.slice(0, 200) + "..."


    return (
        <li key={index} className="bg-linear-to-r from-sky-50 backdrop-blur-2xl to-rose-50/80 px-3 py-3 md:px-5 md:py-5 text-slate-900 rounded-xl shadow-md hover:to-pink-50 transition-colors duration-300">

            <h3 className="font-bold text-xs md:text-sm">{each.title}</h3>

            <section className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                <p className="text-xs md:text-base font-semibold flex items-center gap-1 md:gap-2 mb-2 md:mb-0">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                    {each.location || "Unavailable"}
                </p>
                <p className="px-2 py-0.5 text-[10px] md:text-sm font-semibold bg-pink-100 rounded-xl">
                    {each.status}
                </p>
            </section>

            {/* Conditions */}
            <ul className="w-full mt-5 mb-4 px-4 md:px-6">
                <h3 className="-ml-4 md:-ml-5 text-slate-800 text-xs md:text-base font-semibold mb-2">
                    Conditions Studied:
                </h3>

                {each.condition?.map((c, i) => (
                    <li key={i} className="list-disc text-slate-900 text-[10px] md:text-xs mb-2">
                        <span className="w-fit px-2 py-0.5 bg-sky-100 rounded-xl">
                            {c}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Summary */}
            <p className="text-slate-500 text-[9px] md:text-xs">{summaryText}</p>

            <button
                className="text-sky-500 text-xs md:text-sm underline cursor-pointer mt-2"
                onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                }
            >
                {isExpanded ? "Show less" : "Read more"}
            </button>
        </li>
    );
})}
        </ul>

    </div>
    )
}


// summary (Ai response) >>
const renderAiResponse = () => {
  if (!result?.aiResponse) return (<h1 className="text-slate-800 text-xs md:text-base">Ai Response Summary Not available</h1>)

  let aiSummary;
  try {
    aiSummary = JSON.parse(result.aiResponse);
  } catch (e) {
        console.log(e)
    return "Invalid AI response"
  }

  return (
    <div className="bg-sky-100 p-4 md:p-5 text-slate-800 text-[10px] md:text-xs rounded-xl shadow-md space-y-3">

      <div>
        <h3 className="font-bold text-[10px] md:text-base">Condition Overview</h3>
        <p className="text-[9px] md:text-base">{aiSummary.condition_overview}</p>
      </div>

      <div>
        <h3 className="font-bold text-[10px] md:text-base">Key Research Findings</h3>
        <ul>
          {aiSummary.key_research_findings?.map((item, index) => (
            <li className="text-[9px] md:text-base" key={index}>
              {item.summary} ({item.study_title}, {item.year})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-[10px] md:text-base">Treatment Options</h3>
        <ul>
          {aiSummary.current_treatment_options?.map((t, i) => (
            <li className="text-[9px] md:text-base" key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-[10px] md:text-base">Conclusion</h3>
        <p className="text-[9px] md:text-base">{aiSummary.evidence_based_conclusion}</p>
      </div>

      <div>
        <h3 className="font-bold text-[10px] md:text-base">Confidence Score</h3>
        <p className="text-[9px] md:text-base">{aiSummary.confidence_score}</p>
      </div>

    </div>
  )
}


        return (
            <div className="min-h-screen w-full flex flex-col justify-start items-center pt-15"
                    onClick={(e) => {

            if(window.innerWidth < 640){
                   setOpenSidebar(false),
                    e.stopPropagation()
            }
        }}>
        
        <div className="h-full w-[95%] md:w-[90%] mb-4 md:mb-6 flex flex-col justify-center items-start">
                {/* User Query */}
                <section className="w-fit flex flex-row justify-start items-start ml-auto mb-8 md:mb-10">
                    <div className="w-full bg-sky-500 shadow-md px-4 py-2 rounded-xl rounded-br-none">
                        <h2 className="text-xs md:text-base text-slate-50">{location.state.query}</h2>
                    </div>

                        <div className="h-8 w-10 bg-slate-500 rounded-full shadow-md
                        flex flex-col justify-center items-center ml-2 md:ml-5">
                                <User className="text-slate-50 h-4 w-4 md:h-5 md:w-5"/>
                        </div>
                </section>

                {/* logo + loader + content */}
                <section className={`flex flex-col md:flex-row justify-center ${loading ? "items-start md:items-center" : "items-start"} `}>
                    <div className="h-10 w-10 bg-cyan-400/80 rounded-full shadow-md
                    flex flex-col justify-center items-center mr-4 md:mr-5 mb-3 md:mb-0">
                            🧬
                    </div>
                {loading ? <p className="animate-pulse text-slate-800 text-xs md:text-base">🔍 Processing medical information…</p> :
                !result ? renderServerProblem() : (
                    <div className="w-full flex flex-col justify-start items-start">
                    {renderAiResponse()}
                    {renderPapersContent()}
                    {renderClinicalTrails()}
                
                    </div>

                )
                
                }
    
                </section>
                
                </div>
            </div>
        )

}

export default Chat