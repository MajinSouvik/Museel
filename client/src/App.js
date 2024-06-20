import Trending from "./Components/Trending";
import Login from "./Components/Login";
import {connect} from "react-redux"
import useAuth from "./Components/useAuth";
import { useEffect } from "react";
import Reels from "./Components/Reels";
import UploadSong from "./Components/UploadSong";

const code=new URLSearchParams(window.location.search).get("code");

function App(props) {
  return (
    <div>
      <Reels />
    </div>
    // <UploadSong />
  )
  // const newToken=useAuth(code)

  // useEffect(()=>{
  //   if (!newToken) return;
  //   props.changeToken(newToken)
  // },[newToken])
 
  // return (props.token?<Trending />:<Login />) 
  // return (props.token?<Reels />:<Login />) 
}

const mapStateToProps=(state)=>{
  return {token:state.auth.token}
}

const mapDispatchToProps = (dispatch)=>{
  return {
    changeToken:(t)=>dispatch({type:"TOKEN",payload:t})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
