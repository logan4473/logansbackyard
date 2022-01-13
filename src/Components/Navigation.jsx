import logo from ".././svg/logo.svg";
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {ImSearch} from 'react-icons/im';
import {FaUserNinja} from 'react-icons/fa';
import Cart from "./Cart";
import axios from 'axios';

function Navigation() {

    const [user,setUser] = useState();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const url = new URLSearchParams({token:token});
            axios.post("/api/verify",url)
            .then(({data})=>{
                setUser(data);
            })
            .catch((err)=>{
                console.log(err.message);
                localStorage.removeItem('token');
            });
        }
    }, [user])


    const logout = (event)=>{
        setUser({});
        localStorage.clear();
    }

    const [dropDown,setDropDown] = useState("hidden");

    return ( 
        <nav id="header" className="w-full z-30 top-0 py-1">
    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">

        <div className="order-1" id="menu">
            <nav>
                <button onClick={()=>(dropDown==="hidden"?setDropDown("block"):setDropDown("hidden"))}>
                <GiHamburgerMenu/>
                </button>
            </nav>
        </div>

        <div className="order-1 md:order-2">
            <Link to="/">
            <div className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                <img src={logo}/>
                <span className="md:block hidden">Logan's Backyard</span>
            </div>
            </Link>
        </div>

        <div className="order-2 md:order-3 flex items-center" id="nav-content">

            <a className="flex flex-col items-center" href={user?"":"/login"} onClick={user?logout:null}>
                <FaUserNinja/>
                {user?user.firstName:""}
            </a>

            <Cart/>

        </div>
    </div>
    <div className={dropDown}>
                <ul className="grid md:inline-flex py-4">
                <li>
                    <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                    <span className="text-sm font-medium">
                    <div className="pt-2 relative mx-auto text-gray-600">
                        <form action="/search/">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" minLength={2}/>
                        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                            <ImSearch></ImSearch>
                        </button>
                        </form>
                    </div>
                    </span>
                    </div>
                </li>
                <li>
                    <a href="/search/?Category=Laptop" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                    <span className="text-sm font-medium">Laptops</span>
                    </a>
                </li>
                <li>
                    <a href="/search/?Category=Mobile" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                    <span className="text-sm font-medium">Mobiles</span>
                    </a>
                </li>
                <li>
                    <a href="/search/?Category=Fashion" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                    <span className="text-sm font-medium">Fashion</span>
                    </a>
                </li>
                <li>
                    <a href="/search/?Category=Appliance" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
                    <span className="text-sm font-medium">Appliances</span>
                    </a>
                </li>
                <li>
                    <a href="/search/?Category=Collectable" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                    <span className="text-sm font-medium">Collectables</span>
                    </a>
                </li>
                {/* <li>
                    <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-bell"></i></span>
                    <span className="text-sm font-medium">Notifications</span>
                    <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
                    </a>
                </li> */}
                <li>
                    <a href={user?"/login":""} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                    <span className="text-sm font-medium">{user?"Logout":"Login/Sign Up"}</span>
                    </a>
                </li>
                </ul>
                </div>
        </nav>
     );
}

export default Navigation;