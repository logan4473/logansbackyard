import logo from "../svg/logo.svg";

function Loading() {
    return ( 
        <img src={logo} className="animate-spin block m-auto w-1/3 h-1/3 opacity-80"/>
     );
}

export default Loading;