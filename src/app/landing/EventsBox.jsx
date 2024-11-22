import { useEffect, useState,useLayoutEffect } from "react";
import { supabase } from "../common/supabase";
import EventCard from "../components/EventCard";
import { Bars    } from "react-loader-spinner";
export default function EventsBox() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase.from("events").select("*");
            if (error) {
                console.error("Error fetching events:", error);
            } else {
                console.log("Fetched events:", data);
                setEvents(data);

                // Immediately filter for the default year
                const filteredEvents = data.filter(
                    (event) =>
                        event.event_date &&
                        new Date(event.event_date).getFullYear() === selectedYear
                );
                setSelectedEvent(filteredEvents);
            }
        } catch (err) {
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false); // Mark loading as complete
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (!loading) {
            // Re-filter when year changes (after initial load is complete)
            const filteredEvents = events.filter(
                (event) =>
                    event.event_date &&
                    new Date(event.event_date).getFullYear() === selectedYear
            );
            setSelectedEvent(filteredEvents);
            console.log("Selected Year:", selectedYear, "Filtered Events:", filteredEvents);
        }
    }, [selectedYear, events, loading]);

    if (loading) {
        // Render a loader or placeholder until data is ready
        return (
            <div className="flex flex-col justify-center items-center w-screen h-full text-gray-500">
                            <p className="text-[2em] font-extrabold m-4 text-[#4F4242]">Loading Events...</p>

                            <Bars
                            height="80"
                            width="80"
                            color="#4F4242"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />

            </div>
        );
    }

 
    return (
        <div className="flex flex-col text-[#4F4242] league-spartan w-[100vw] h-[100vh] relative">
            <div
                className="text-center space-y-4 lg:space-y-6"
                style={{ lineHeight: "1", letterSpacing: ".3" }}
            >
                <p className="text-[5em] font-extrabold">Events</p>
                <div className="flex flex-col items-center justify-center">
                    <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
                    <div className="flex justify-center overflow-x-scroll gap-[2%]  lg:w-[65vw] lg:h-[60vh] w-[95vw]  mt-[2%] h-[40vh]     ">
                        {selectedEvent.map((event) => (
                            <EventCard key={event.event_name} eventName={event.event_name} selectedYear={selectedYear} />
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
            className="
                flex items-center justify-center
                gap-2
                w-[95vw] lg:flex-col lg:items-end lg:justify-center lg:h-56 lg:w-56
                lg:absolute lg:right-0 lg:transform lg:-translate-y-1/2"
        >
            {availableYears.map((year) => (
                <button
                    key={year}
                    className={`
                        league-spartan font-bold text-center
                        text-lg sm:text-2xl md:text-3xl lg:text-4xl
                        px-4 py-2 border-2 border-[#C23E30] lg:rounded-l-md
                        rounded-md
                        transition-all duration-300 ease-in-out
                        ${
                        selectedYear === year
                            ? "text-white bg-[#C23E30] w-full lg:w-[100%]"
                            : "text-[#C23E30] bg-transparent w-[80%] lg:w-[80%]"
                    } hover:text-white hover:bg-[#C23E30]`}
                    onClick={() => setSelectedYear(year)}
                >
                    {year > 2000 && year < 2099 ? "2K" + String(year).split(20)[1] : year}
                </button>
            ))}
        </div>
    );
}
