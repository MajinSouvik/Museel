import Reel from "./Reel"
import Music from "./Music"

function Trending(){
    return(
        <div>
            <div className="flex justify-center items-center text-5xl text-blue-400">
                Trending ...
            </div>

            <Reel />
            <Music />
        </div>
    )
}

export default Trending