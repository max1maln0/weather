import cloude from '../../../assets/icons/cloude.png';

export default function DailyForecastRow({ day }) {
  const { label, min, max } = day;

  return (
    <div className="flex items-center px-4 py-3 text-white">
 
      <span className="w-20 text-sm text-white/90">
        {label}
      </span>

      <div className="w-8 h-8 flex items-center justify-center">
        <img src={cloude} alt="cloude" className="w-6 h-6 opacity-90"
        />
      </div>

      <span className="w-10 text-sm text-white/70 text-right">
        {min}°
      </span>

      <div className="flex-1 mx-3">
        <div className="relative h-1 rounded-full bg-white/20">
          <div className="absolute h-1 rounded-full bg-yellow-400 w-1/2 left-1/4" />
        </div>
      </div>

      <span className="w-10 text-sm text-white text-right">
        {max}°
      </span>
    </div>
  );
}
