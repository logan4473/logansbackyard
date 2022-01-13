import Rating from "./Rating";
import Loading from "./Loading";
import Error from "./Error";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Img from "./Img";
import { Link, useHistory } from "react-router-dom";
import {MdOutlineAddShoppingCart,MdOutlineRemoveShoppingCart,MdOutlineRemoveCircle,MdAddCircle} from "react-icons/md";

function Product(props) {

    const ID = props.id;
    const history = useHistory();

    const [user,setUser] = useState();
    const [product,setProduct] = useState({});
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [count,setCount] = useState(1);
    const [incart,setincart] = useState();

    useEffect(()=>{
        const fetchData = async() =>{
            try
            {
                setLoading(true);
                const {data} = await axios.get(`/api/product/${ID}`);
                const similar = await axios.get(`/api/products/query/?Category=${data.Category}`);
                setLoading(false);
                setProduct(data);
                setProducts(similar.data.filter((prod)=>(prod._id!==data._id)))
                
            }
            catch(err)
            {
                setError(true);
                setLoading(false);
                console.log(err)
            }
            
        };
        fetchData();

    },[])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const url = new URLSearchParams({token:token});
            setLoading(true);
            axios.post("/api/verify",url)
            .then((User)=>{
                setUser(User.data);
                User.data.cart.includes(ID)?setincart(true):setincart(false);    
            })
            .catch((err)=>{
                console.log(err);
                setError(true);
            });
            setLoading(false);
        }
    },[user]);

    const handleClick = (event)=>{

        if(user)
        {   
            setLoading(true);
            if(incart){
                const key = user.cart.findIndex((i)=>(i===product._id));
                user.cart.splice(key,1);
                setincart(false);
            }
            else{
                user.cart.push(product._id);
                setincart(true);
            }

            const url = new URLSearchParams({userid : user._id});

            user.cart.forEach((val)=>{
                url.append("array",val);
            })

            axios.post("/api/cart/update",url)
            .then(({data})=>{
                console.log(data);
                localStorage.setItem('token',data);
            })
            .catch((err)=>{
                console.log(err.message);
            })
            setLoading(false);

            
        }
        else
        history.push("/login/");
    }

    return (
        <>
        {
            loading?<Loading></Loading>
            :error?<Error></Error>:
        <div className="container mx-auto px-6">
        <div className="md:flex md:items-center">
            <div className="rounded-md object-cover max-w-lg mx-auto" >
            <Img url={product._id} alt={product.Name}/>
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                <h3 className="text-gray-700 uppercase text-lg">{product.Name}</h3>
                <span className="text-gray-500 mt-3">${product.Price}</span><br/>
                {product.Description}<br/>
                <Rating num={product.Rating}/><br/>
                Seller : {product.Seller}
                <div className="mt-2">
                    <label className="text-gray-700 text-sm" for="count">Count:</label>
                    <div className="flex items-center mt-1">
                        <button onClick={()=>(count>1?setCount(count-1):null)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                           <MdOutlineRemoveCircle color="red"/>
                        </button>
                        <span className="text-gray-700 text-lg mx-2">{count}</span>
                        <button onClick={()=>(setCount(count+1))} className="text-gray-500 focus:outline-none focus:text-gray-600">
                            <MdAddCircle color="red"/>
                        </button>
                    </div>
                </div>
                <div className="flex items-center mt-6">
                    <Link to={{pathname: "/payment", product:[product] , qty:count}}>
                    <span className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</span>
                    </Link>
                    <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none" onClick={handleClick}>
                        {incart?<MdOutlineRemoveShoppingCart></MdOutlineRemoveShoppingCart>:<MdOutlineAddShoppingCart></MdOutlineAddShoppingCart>}   
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-16">
            <h3 className="text-gray-600 text-2xl font-medium">Similar Products</h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
             {
                products.map((product)=>(
                <a key={product._id} href={`/product/${product._id}`}>
                        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                            <div className="flex items-end justify-end h-56 w-full bg-cover">
                                <Img url={product._id} alt={product.Name}/>
                            </div>
                            <div className="px-5 py-3">
                                <h3 className="text-gray-700 uppercase">{product.Name}</h3>
                                <span className="text-gray-500 mt-2">Rs{product.Price}</span><br/>
                                <Rating num={product.Rating}/>
                            </div>
                        </div>
                </a>

            )
            )

            }
            </div>
        </div>
    </div>
    }
    </>
     );
}

export default Product;