


export default function Input({value, onChange}) {
    return(
        <>
            <input type="text" value={value} onChange={onChange}  placeholder="Введите город..." className="bg-gray-800 rounded-md max-w-55 px-3 py-4 ml-3 border border-white/20"/>
        </>
    )
}