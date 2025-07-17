import { useState } from 'react';
import Heading from './Heading';

function App() {
  const [formData, setFormData] = useState({
    totalbill: '',
    totalunit: '',
    yourname: '',
    yourunit: '',
  });
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <Heading />
      <form onSubmit={handleClick}> 
        <label>
          <b>Total Electricity Bill:</b>
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="totalbill"
          value={formData.totalbill}
        />
        <br />

        <label>
          <b>Total Unit:</b>
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="totalunit"
          value={formData.totalunit}
        />
        <br />

        <label>Enter Your Name: </label>
        <input
          onChange={handleChange}
          type="text"
          name="yourname"
          value={formData.yourname}
        />
        <br />

        <label>Enter Your Unit: </label>
        <input
          onChange={handleChange}
          type="number"
          name="yourunit"
          value={formData.yourunit}
        />
        <button type="submit">Evaluate</button> 
        <div>
          <ol>
            {items.map((item, index) => (
              <li key={index} onClick={()=> handleDelete(index)}>
                {item.yourname}: {item.yourunit} Rs
              </li>
            ))}
          </ol>
        </div>
      </form>
    </div>
  );
}

export default App;