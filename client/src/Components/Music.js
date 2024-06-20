import CottageIcon from '@mui/icons-material/Cottage';
import SearchIcon from '@mui/icons-material/Search';
import SearchComponent from "./SearchComponent";

function Music(){
    return(
        <div>
            <div className="text-2xl space-y-2 mt-3 border-2 border-indigo-400 w-80">
                <div className="flex items-center space-x-4 ">
                    <CottageIcon className="mt-1"/>
                    <p>Home</p>
                </div>

                <div className="flex items-center space-x-4 ">
                    <SearchIcon className="mt-1"/>
                    <p>Search</p>
                </div>
            </div>
            <SearchComponent />
        </div>
        
    )
}

export default Music