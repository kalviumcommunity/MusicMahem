import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [userName,setUserName] = useState(getCookie('username'))
    const [password,setPassword] = useState(getCookie('password'))
    const navigate = useNavigate();
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    function setCookie(name, value, daysToExpire) {
        let date = new Date();
        date.setTime(date.getTime() + daysToExpire * 365);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    }
        const submit=(e)=>{
            e.preventDefault();
            axios.post('http://localhost:3000/login',{
                Name:userName,
                Password:password
            }).then((response)=>{
            setCookie('token', response.data.accessToken,365);
            setCookie('username', userName,365);
            navigate('/')})
            .catch((error)=>{console.error(error)});

        }
        return(
        <>
        <div id='Body'>
        <div id='Navbar'>
            <Link to='/'><h1>Music Mahem</h1></Link>
        </div>
        <div id='Body-content'>
          <div id='loginForm'>
          <form onSubmit={submit}>
            <div className='labelStyle'><label>Name : </label>
                <input type="text" onChange={(e)=>{setUserName(e.target.value)}}/></div>
                <div className='labelStyle'><label>Password : </label>
                <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} /></div>
                <button type="submit">Log In</button>
           </form>
            <Link to='/signup'>SignUp</Link>
                </div>
            </div>

      
        </div>
        </>
        )
    
}

export default Login