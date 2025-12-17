import Header from '../../components/Header.jsx';
import HeroSection from './sections/HeroSection.jsx';
import SummaryCardSection from './sections/SummaryCardSection.jsx';

export default function Weather() {
    const mockWeather = {
    city: "New York",

    temperature: {
        current: -16,
        feelsLike: -22,
        min: -17,
        max: -13,
    },

    hourly: {
        summary: "Cloudy conditions from 1AM–9AM, with showers expected at 9AM.",
        items: [
        {
            time: "Now",
            temp: 21,
            icon: "cloud",
        },
        {
            time: "10PM",
            temp: 21,
            icon: "rain",
        },
        {
            time: "11PM",
            temp: 19,
            icon: "rain",
        },
        {
            time: "12AM",
            temp: 19,
            icon: "rain",
        },
        {
            time: "1AM",
            temp: 19,
            icon: "cloud-sun",
        },
        ],
    },
    };

    return(
        <>
            <Header />
            <div className="flex flex-col lg:flex-row items-start gap-10 px-6 mt-6">
                <div className="w-[320px]">
                    <HeroSection weather={mockWeather} />
                </div>

                <div className="flex-1 mt-10">
                    <SummaryCardSection hourly={mockWeather.hourly} />
                </div>
            </div>

        </> 
    )
}