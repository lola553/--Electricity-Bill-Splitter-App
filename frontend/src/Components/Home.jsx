import { useState , useEffect } from 'react';
import Heading from './Heading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({
    totalbill: '',
    totalunit: '',
    yourname: '',
    yourunit: '',
  });
  const [items, setItems] = useState([]);
  const navigate = useNavigate()

  async function fetchUser() {
    try{
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:3000/auth/home" , {
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      if (response.status !== 201){
        navigate("/login")
      }
    } catch(err){
      navigate("/login")
      console.log(err.message)
      
    }

  } 
  
  useEffect(()=>{
    fetchUser()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function resetInputs() {
    setFormData({
      totalbill: formData.totalbill, 
      totalunit: formData.totalunit,
      yourname: '',
      yourunit: '',
    });
  }

  function evaluate() {
    const totalBillValue = parseFloat(formData.totalbill) || 0;
    const totalUnitValue = parseFloat(formData.totalunit) || 0;
    const yourUnitValue = parseFloat(formData.yourunit) || 0;


    const division = totalBillValue / totalUnitValue;
    const convertToDecimal = division.toFixed(2);
    const multiplication = yourUnitValue * parseFloat(convertToDecimal);
    const preciseMultiplication = multiplication.toFixed(2);
    return preciseMultiplication;
  }

  function handleClick(event) {
    event.preventDefault(); 
    if (formData.yourname.trim() && formData.yourunit) {
      const calculatedBill = evaluate(); 
      setItems([...items, { yourname: formData.yourname, yourunit: calculatedBill }]);
      resetInputs();
    }
  }
  function handleDelete(id){
    setItems(prevValue =>{
      return prevValue.filter((item,index)=>{
        return id !== index
      })
      
    })
  }
  function handleLogout() {
  localStorage.removeItem("token");
  navigate("/login");
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
    <Heading />
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >     
        Logout
        </button>
      </div>



    <form onSubmit={handleClick} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Total Electricity Bill
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="totalbill"
          value={formData.totalbill}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Total Unit
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="totalunit"
          value={formData.totalunit}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Enter Your Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="yourname"
          value={formData.yourname}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Enter Your Unit
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="yourunit"
          value={formData.yourunit}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Evaluate
      </button>

      <div className="pt-4">
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleDelete(index)}
              className="cursor-pointer hover:text-red-500"
            >
              {item.yourname}: {item.yourunit} Rs
            </li>
          ))}
        </ol>
      </div>
    </form>
  </div>
</div>
  )
}

export default Home;