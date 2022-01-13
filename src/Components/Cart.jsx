import { useState, useEffect } from 'react';
import {MdShoppingCart} from 'react-icons/md';
import { useHistory ,Link} from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';
import Img from './Img';
import {MdOutlineRemoveCircle,MdAddCircle} from 'react-icons/md';

function Cart() {
  const history = useHistory();
  const [products,setProducts] = useState();
  const [showcart,setcart] = useState("hidden");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [product,setproduct] = useState([]);
  const [isempty,setIsEmpty] = useState(true);
  const [total,setTotal] = useState(0);
  const [count,setCount] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
        if(token){
            const url = new URLSearchParams({token:token});
            axios.post("https://glacial-peak-47541.herokuapp.com/api/verify",url)
            .then(({data})=>{
                setProducts(data.cart);
            })
            .catch((err)=>{
                setError(true);
                console.log(err.message);
            });
        }
        
  }, [products])

  const handleClick = (event)=>{
    if(products){

      setcart("");

      if(products.length)
      {
        setproduct([]);
        setLoading(true);

        const url = new URLSearchParams();
      
        products.forEach((val)=>{
          url.append("array",val);
        })

        axios.post("/api/cart/",url)
        .then((products)=>{
          setproduct(products.data);
          setTotal(products.data.map((items)=>(items.Price)).reduce((a,b)=>(a+b)));
          setLoading(false);
          setIsEmpty(false);
        })
        .catch((error)=>{
          setLoading(false);
          setError(true);
        })
      }
      else
        setproduct([]);

    }
    else
    history.push('/login');
  }

    return ( 
      <>
      <button className="pl-3 inline-block no-underline hover:text-black" onClick={handleClick}>
      <MdShoppingCart/>
      </button>
    <div className={`fixed ${showcart} inset-0 overflow-hidden`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex translate-x-full transition-opacity duration-500 ease-in-out ">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    Shopping cart
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={()=>{setcart("hidden")}}>
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {loading?<Loading></Loading>:
                      error?<Error></Error>:
                      isempty?<p className="text-gray-500 text-xs italic">Cart is Empty</p>:
                      product.map((item)=>(
                      <li key={item._id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <Img url={item._id} alt={item.Name} style="w-full h-full object-center object-cover"/>
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={`/product/${item._id}`} className="hover:text-red-500">
                                  {item.Name}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${item.Price}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.Seller}
                            </p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">
                                <div className="flex items-center mt-1">
                                    <button onClick={()=>(count>1?setCount(count-1):null)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                      <MdOutlineRemoveCircle color="red"/>
                                    </button>
                                    <span className="text-gray-700 text-lg mx-2">{count}</span>
                                    <button onClick={()=>(setCount(count+1))} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                        <MdAddCircle color="red"/>
                                    </button>
                                </div>
                            </p>

                            <div className="flex">
                              <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>
                      ))
                    }
                    </ul>
                  </div>
                </div>
              </div>
              {
               isempty?<></>:
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${total}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <Link to={{pathname: "/payment", product , qty:count}}>
                  <span className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Checkout</span>
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
     );
}

export default Cart;