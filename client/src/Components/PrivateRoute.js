import {Navigate,Outlet} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {setUser} from "../redux/userSlice"
import axios from "axios";
axios.defaults.withCredentials = true;

function PrivateRoute(){
    const token=useSelector((store)=>store.auth.isLoggedIn)
    const refresh=useSelector((store)=>store.auth.refresh)
    const user=useSelector((store)=>store.user.user)
    const dispatch=useDispatch()

    const refreshToken = async (refreshToken) => {
        const res = await axios.post('http://localhost:8000/auth/api/token/refresh/', {
          refresh: refreshToken
      }).catch((err) => console.log(err));
    
        const data = await res.data;
        return data;
      };
       
      const fetchUserDetails = async (token) => {
        try {
          const response = await axios.post('http://localhost:8000/auth/get-user/', {
            user_id: localStorage.getItem('user_id')
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
          dispatch(setUser(response.data.username))
        } catch (error) {
          let userID=localStorage.getItem('user_id')
          localStorage.clear()
          localStorage.setItem('user_id',userID)
          console.error('Failed to fetch user details:', error);
        }
      };

    useEffect(()=>{
        let interval = setInterval(() => {
            refreshToken(refresh).then(fetchUserDetails(token))
          }, 1000 * 29);
          return () => clearInterval(interval);
    },[])

    console.log(user)
    return (
        user ? <Outlet />:<Navigate to="/login" replace />
    )
}

export default PrivateRoute