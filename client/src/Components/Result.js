import { useSelector } from "react-redux"
import Featured from "./Featured"
import Recommended from "./Recommended"

function Result(){
    const result=useSelector((store)=>store.result.result)

    if(Object.keys(result).length===0) return <h1>No Result</h1>

    return(
    <div className="flex">
        <Featured featured={result[0]} />
        <Recommended recommended={result} />
    </div>)
}

export default Result