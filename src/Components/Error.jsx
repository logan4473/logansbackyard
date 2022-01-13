import err from "../svg/error.gif";

function Error() {
    return ( <div className="bg-black h-full w-full fixed">
        <img src={err} className="m-auto" alt="Error"/>
    </div> );
}

export default Error;