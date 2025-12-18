

export default function SummaryCardSection({ hourly }) {
    if (!hourly) return null;

    const {summary, items} = hourly;

    return(
        <section className=" rounded-2xl bg-white/2 backdrop-blur-md p-4">
            <p className="text-sm">{summary}</p>
            <div className="my-3 h-px bg-white/10" />

            <div className="flex justify-between gap-6">
                {items.map((item) => (
                <div key={item.time} className="flex flex-col items-center gap-2">
                    <div className="text-xs text-white/80">{item.time}</div>
                <div>
                    <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" className='w-8 h-8'/>
                </div>
                <div className="text-lg font-medium">{item.temp}°</div>
            </div>
        ))}
            </div>
        </section>
    )
}