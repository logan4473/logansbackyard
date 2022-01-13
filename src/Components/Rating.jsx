import {ImStarEmpty, ImStarFull, ImStarHalf} from "react-icons/im";

function Rating(props) {

    const num = props.num;

    if(num===0)
    {
        return (
            <span className="inline-flex">
            <ImStarEmpty/>
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num>0&&num<1)
    {
        return (
            <span className="inline-flex">
            <ImStarHalf color="#ff4747"/>
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num===1)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num>1&&num<2)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarHalf color="#ff4747"/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num===2)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num>2&&num<3)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarHalf color="#ff4747"/>        
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }else if(num===3)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarEmpty/>        
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num>3&&num<4)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarHalf color="#ff4747"/>      
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num===4)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarEmpty/>        
            </span>
        );
    }
    else if(num>4&&num<5)
    {
        return (
            <span className="inline-flex">
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarFull color="#ff4747"/>
            <ImStarHalf color="#ff4747"/>     
            </span>
        );
    }
    else
    {

    return (
        <span className="inline-flex">
        <ImStarFull color="#ff4747"/>
        <ImStarFull color="#ff4747"/>
        <ImStarFull color="#ff4747"/>
        <ImStarFull color="#ff4747"/>
        <ImStarFull color="#ff4747"/>     
        </span>
    );
    }
}

export default Rating;