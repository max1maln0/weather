 export default function HeroSection({ weather }) {
    if (!weather) return null;

    const { city, temperature} = weather;
    
    return(
        <section className="text-center lg:text-left py-10 px-10 ">
            <div className="inline-block text-center">
                <h2 className="text-3xl font-medium tracking-tight">{city}</h2>
                <div className="text-8xl mt-2 tracking-tight">{temperature.current}°</div>
                <div className="text-lg mt-3 text-gray-300">Ощущается как {temperature.feelsLike}°</div>
                <div className="mt-1 text-lg">H: {temperature.max}°, L: {temperature.min}°</div>
            </div>
        </section>
    )
}