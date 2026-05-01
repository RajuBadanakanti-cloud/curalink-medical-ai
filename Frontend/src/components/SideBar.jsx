import { useContext} from "react";
import { PanelLeftOpen, PanelLeftClose, Trash2 } from "lucide-react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const {queries, setQueries, setAutoFocused, openSidebar, setOpenSidebar} = useContext(UserContext)

  const isOpen = openSidebar ? "w-[85%] md:w-[25%] h-screen" : "w-5 bg-transparent h-fit "


const navigation = useNavigate()

// Delete Tab>>>
const onDeleteTab = (indexToDelete) => {
   
    const updatedList = queries.filter((e, index) => index !== indexToDelete)
    setQueries(updatedList)
    localStorage.setItem("queries", JSON.stringify(updatedList))
    navigation("/")
        
}


return (
    <div className={`${isOpen} bg-sky-100 mt-18 fixed top-0 left-0 z-40`}>
      <header className={`h-10 md:h-12 w-full ${openSidebar ? "bg-sky-50" : "bg-transparent" } flex items-center px-1 md:px-4`}>
        <button className="ml-auto" onClick={(e) => (setOpenSidebar(!openSidebar), e.stopPropagation())}>
          {openSidebar ? <PanelLeftClose className="h-4 w-4 md:h-5 md:w-5" /> : <PanelLeftOpen  className="h-4 w-4 md:h-5 md:w-5"/>}
        </button>
      </header>
      {/* content */}
      <div className={`w-full px-4 ${openSidebar ? "flex" : "hidden"} flex-col justify-center items-center`}> 
        <button type="button" 
        onClick={() => (setOpenSidebar(false), navigation("/"), setAutoFocused(true))}
        className="h-10 md:h-12 w-full bg-sky-400 text-xs md:text-base text-slate-50 font-bold shadow rounded-xl
         cursor-pointer"> 
          + Add</button>
      </div>

      <div className={`${openSidebar ? "flex h-screen " : "hidden"} flex flex-col justify-start items-center px-3 mt-10
       overflow-y-auto`}> 

        {/* Quick Searches */}
        <ul className="w-full grid grid-cols-1 gap-2">
            {queries?.map((each, index) => {
                
                return (
                <li key={index} className="w-[90%] bg-sky-900/50 backdrop-blur-xl border-2 border-sky-200 px-4 md:px-5 py-2 text-slate-900 rounded-full 
                flex justify-between items-center" 
                onClick={() => navigation("/chat", { state: each })}>
                    {/* title and date */}
                    <section className="flex flex-col justify-center items-start flex-wrap mr-2">
                        <h1 className="text-slate-100 text-xs md:text-base font-bold">{each.disease}</h1>
                        <p className="text-slate-200 text-[8px] md:text-[10px]">{each.time}</p>
                    </section>
                    <button type="button"   
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTab(index);
                      }}

                    className="text-slate-600 cursor-pointer
                     hover:text-red-500 transition-colors duration-200">
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4"/>
                    </button>
                </li>
            )})
            }

        </ul>

      </div>
    </div>
  );
};

export default SideBar;