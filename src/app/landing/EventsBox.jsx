
import { useEffect,useLayoutEffect,useState } from "react";
import { supabase } from "../common/supabase";
import EventCard from "../components/EventCard";

export default function EventsBox() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {   

        let { data, error } = await supabase.rpc('get_events_in_year', {target_year:selectedYear })
        if (error) console.error(error)
        else  { 
            console.log(data)
            setEvents(data)
        }

    }

    useEffect(() => {
        fetchEvents();
    }
    , [selectedYear]);

        
    return (
        <div className="flex flex-col text-[#4F4242] league-spartan w-[100vw] h-[100vh] relative">
            <div
                className="text-center space-y-4 lg:space-y-6"
                style={{ lineHeight: "1", letterSpacing: ".3" }}
            >
                <p className="text-[5em] font-extrabold">Events</p>
                <div className="flex flex-col items-center justify-center">
                    <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
                    <div className="flex justify-center overflow-x-scroll gap-[2%] w-[60%] h-[60vh] mt-[2%]    ">
                        {events.map((event) => (
                            <EventCard key={event.event_name} eventName={event.event_name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}





function YearSelector({ selectedYear, setSelectedYear }) {
    const [availableYears, setAvailableYears] = useState([]);

    useLayoutEffect(() => {
        async function fetchYears() {
            let { data, error } = await supabase.rpc("get_event_years");
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                // Reverse the years to show the latest year first
                data = data.reverse();
                setAvailableYears(data);
            }
        }
        fetchYears();
    }, []);

    return (
        <div
            className="flex flex-col items-end justify-center
                        space-y-2 h-56 w-56 
                        absolute right-0 top-1/2 transform -translate-y-1/2"
        >
            {availableYears.map((year) => (
                <button
                    key={year}
                    className={`
                        league-spartan font-bold text-left pl-2
                        text-lg sm:text-2xl md:text-3xl lg:text-4xl
                        h-14 border-2 border-[#C23E30] 
                        transition-all duration-300 ease-in-out
                        ${
                        selectedYear === year
                            ? "text-white bg-[#C23E30] w-full"
                            : "text-[#C23E30] bg-transparent w-[80%]"
                    } hover:text-white hover:bg-[#C23E30]`}
                    onClick={() => setSelectedYear(year)}
                >
                    {year > 2000 && year < 2099 ? "2K" + String(year).split(20)[1] : year}
                </button>
            ))}
        </div>
    );
}
