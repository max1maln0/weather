import { Link } from "react-router-dom";


export default function HomePage(){
    return(
        <>
            <Link to="/weather" className="flex mt-10 max-w-45 ml-5 rounded-xl bg-white/10 border border-white/10 px-5 py-3">Перейти к погоде →</Link>
        </>
    )
}