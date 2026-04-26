
export default function Loader({loading}) {
    if(loading) {
        return(
            <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#1D293D] rounded-full animate-spin text-center"></div>
        </div>
        )
    }else {
        return null
    }
}