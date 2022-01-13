import { useHistory } from 'react-router-dom';
import desktopBG from '../svg/desktop.jpg';
import mobileBG from '../svg/mobile.jpg';
import axios from 'axios';
import { useState } from 'react';


function Payment({location}) {

  const [error,setError] = useState(false);
    const product = location.product;
    const history = useHistory();
    if(!product)
    {
      history.push("/");
      return null;
    }
      
    const width = window.screen.width;
    const total = product.map((a)=>a.Price).reduce((a,b)=>a+b,0);

    const token = localStorage.getItem('token');

    const handleSubmit = (event)=>{
      event.preventDefault();

      const address = event.target.address.value + "," + event.target.city.value + "(" + event.target.pin.value + ")";
      const success = [];

      product.forEach((val)=>{

        const url = new URLSearchParams({
          productid : val._id ,
          qty : 1,
          address : address,
          token : token
        });
        
        axios.post("https://glacial-peak-47541.herokuapp.com/api/payment",url)
        .then(({data})=>{
          if(data!=="Out of Stock")
          {
            success.push(val._id);
            localStorage.setItem('token',data);
          }
        })
        .catch((err)=>{
          console.log(err.message);
        });

      });


      history.push({pathname:"/summary",orders : product,success : success});
  }

    return ( 
        <div className="fixed flex justify-center bg-cover h-full w-full" style={width>768?{backgroundImage : `url(${desktopBG})`}:{backgroundImage : `url(${mobileBG})`}}>
  <form className="fixed max-w-xl m-4 p-10 bg-white bg-opacity-50 rounded shadow-xl" onSubmit={handleSubmit} >
    <p className="text-gray-800 font-medium">Customer information</p>
    <div className="mt-2">
      <label className="text-gray-700 text-sm font-bold mb-2">Name</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-white rounded leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" required placeholder="Your Name" />
    </div>
    <div className="mt-2">
      <label className="text-gray-700 text-sm font-bold mb-2" >Mobile</label>
      <input className="w-full px-2  py-2 text-gray-700 bg-white rounded leading-tight focus:outline-none focus:shadow-outline" name="mobile" type="text" required placeholder="Your Mobile No." />
    </div>
    <div className="mt-2">
      <label className=" text-gray-700 text-sm font-bold mb-2" >Shiping Address</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-white rounded leading-tight focus:outline-none focus:shadow-outline"  name="address" type="text" required placeholder="Street" />
    </div>
    <div className="mt-2">
      <label className=" text-gray-700 text-sm font-bold mb-2" >City</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-white rounded leading-tight focus:outline-none focus:shadow-outline"  name="city" type="text" required placeholder="City" />
    </div>
    <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
      <label className=" text-gray-700 text-sm font-bold mb-2" >PIN Code</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-white rounded leading-tight focus:outline-none focus:shadow-outline"   name="pin" type="text" required placeholder="PIN" />
    </div>
    <p className="mt-4 text-gray-800 font-medium">Payment information</p>
    <div className="">
      <label className="text-gray-700 text-sm font-bold mb-2" for="cus_name">Card</label>
      <input className="w-full px-2 py-2 text-gray-700 bg-white rounded leading-tight focus:outline-none focus:shadow-outline"  name="card" type="text" required placeholder="Card Number MM/YY CVC" />
    </div>
    <div className="mt-4 flex flex-col items-center">
      <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded">${total}</button>
    </div>
  </form>
</div>
     );
}

export default Payment;