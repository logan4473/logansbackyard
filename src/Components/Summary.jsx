import { useHistory } from 'react-router-dom';
import Img from './Img';
import Navigation from './Navigation';


function Summary({location}) {

    const history = useHistory();

    const orders = location.orders?location.orders:history.push('/');
    const success = location.success?location.success:history.push('/');


    return (
        <>
        <Navigation></Navigation>
        <div class="w-full my-12">
        <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 h-">
                <div class="bg-white w-full shadow rounded p-8 h-">
                    <h1 class="md:text-3xl text-2xl font-bold text-gray-800">Summary</h1>
                    <div class="grid grid-cols-1 gap-8 mt-6">
                        {
                            orders.map((items)=>(
                        <div key={items._id} class="flex flex-col md:flex-row">
                            <div class="w-full md:w-6/12 rounded overflow-hidden">
                                <Img style="object h-60 w-80 " alt={items.Name} url={items._id}/>
                            </div>
                            <div class="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
                                <h2 class="text-lg font-semibold leading-tight text-gray-800">{items.Name}</h2>
                                <p class="leading-normal pt-2">
                                    {items.Description}<br/>
                                    ${items.Price}<br/>
                                    {success.includes(items._id)?<span className="text-green-500" >Successful</span>:<span className="text-red-500" >Failed : Out of Stock</span>
                                    }
                                </p>
                            </div>
                        </div> 
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default Summary;