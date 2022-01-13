import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import Rating from './Rating';
import Img from './Img';
import Navigation from './Navigation';

function Home() {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    useEffect(()=>{
        const fetchData = async() =>{
            try
            {
                setLoading(true);
                const {data} = await axios.get('https://glacial-peak-47541.herokuapp.com/api/products');
                setLoading(false);
                setProducts(data);
            }
            catch(err)
            {
                setError(true);
                setLoading(false);
            }
            
        };
        fetchData();
    },[])

    return (
        <>
        <Navigation/>
        {
        loading?<Loading></Loading>
        :error?<Error></Error>:
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {products.map((prod)=>(
                <Link key={prod._id} to={`product/${prod._id}`}>
                <div className="h-full w-full rounded-md object-cover max-w-lg mx-auto border-2 hover:bg-gray-300">
                    <div className="h-3/4 w-full border border-gray-200 rounded-md overflow-hidden">
                    <Img url={prod._id} alt={prod.Name}/>
                    </div>
                    <div className=" h-1/4 flex items-center flex-col">
                    {prod.Name}
                    <span>${prod.Price}</span>
                    <span className=" text-yellow-600">{prod.Rating}
                    <Rating num={prod.Rating}/>
                    </span>
                    </div>
                </div>
        </Link>
            )
            )}
        </div>
        }
        </>
     );
}

export default Home;