import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Input from "../../components/Input";


export default function HomePage(){
    return(
        <>
            <Header />

            <div className="flex flex-col items-center p-4 mt-5">
                <h2 className="text-3xl font-bold mb-3">Узнай погоду</h2>
                <p className="text-lg text-gray-400">Введите название города чтобы узнать <span className="flex justify-center">текущую погоду погоду</span></p>
            </div>

            <div className="flex flex-col items-center gap-5">
                    <Input />
                    <Link to="/weather" className="flex  max-w-55 ml-3 rounded-xl bg-white/5 border border-white/10 px-3 py-3">Перейти к погоде →</Link>
            </div>
            
        </>
    )
}