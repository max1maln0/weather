import sunIcon from "../assets/icons/Cloude.png";


export default function Header() {
  return (
    <header className="flex items-center gap-3 px-4 py-3 font-bold text-lg">
        <img src={sunIcon} alt="Sun Icon" className="w-8 h-8 opacity-90"/>
        <h1 className="">Weather App</h1>
    </header>
  );
}