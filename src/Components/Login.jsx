import { useHistory } from 'react-router-dom';
import desktopBG from '../svg/desktop.jpg';
import mobileBG from '../svg/mobile.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Login() {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token)
            history.push('/');
    }, [])

    const width = window.screen.width;
    const history = useHistory();

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [efind,setEfind] = useState();
    const [epass,setEpass] = useState();

    const handleSubmit = (event)=>{
        event.preventDefault();
        const url = new URLSearchParams({mobile : event.target.mobile.value, password : event.target.password.value});
        setLoading(true)
        axios.post("https://glacial-peak-47541.herokuapp.com/api/login",url)
        .then(({data})=>{
            localStorage.setItem('token',data);
        })
        .catch(err=>{
            setError(true);
            setLoading(false);
        });

        history.push('/');
    }

    return (
        <div className=" bg-cover fixed grid place-content-center h-full w-full  overflow-hidden" style={width>768?{backgroundImage : `url(${desktopBG})`}:{backgroundImage : `url(${mobileBG})`}}>
        <div className="w-full max-w-xs">
            <form className=" bg-opacity-50 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Mobile Number
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" maxLength="10" minLength="10" placeholder="Mobile" name="mobile" required autoFocus/>
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password"  type="password" placeholder="******************" required/>
                <p className="text-red-500 text-xs italic">{}</p>
                </div>
                <div className="flex items-center flex-col justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Log In
                </button>
                </div>
                <div className="flex flex-col justify-between items-center p-3">
                <a className="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
                <a className=" text-blue-500 hover:text-blue-700 text-sm font-bold" href="/signup">Don't have an Account Sign Up</a>
                </div>
            </form>
        </div>
        </div>
     );
}

export default Login;