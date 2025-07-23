import { useState } from "react"
import {Link , useNavigate} from "react-router-dom"
import axios from "axios"

function Signup(){
    
    const [input , setInput] = useState({
        username: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    
    function handleChange(event){
       const { name , value } = event.target
        
       setInput((prevValue)=>{
        return{
            ...prevValue,
            [name] : value
        }
       })
    }

    async function  handleClick (event){
        event.preventDefault()
        try{
            const response = await axios.post('http://localhost:3000/auth/signup', input)
            
            if (response.status === 201){
                navigate("/login")
            }

        } catch(err){
            if (err.response && err.response.status === 409 ){
                alert("Account already existed. Please login")
                navigate("/login")
            }else {
                console.log(err.message)
            }
        }
        
    }
    
    

    
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="shadow-lg px-8 py-5 border w-96">
                    <h2 className="text-lg font-bold mb-4">Signup</h2>
                    <form onSubmit={handleClick}>
                        <div className="mb-4">
                            <label className="block text-grey-700">Username</label>
                            <input className="w-full px-3 py-2 border" type="text" name="username" value={input.username} onChange={handleChange} placeholder="Enter Username"></input>
                        </div>
                        <div className="mb-4">
                            <label className="block text-grey-700">Email</label>
                            <input className="w-full px-3 py-2 border" type="email" name="email" value={input.email} onChange={handleChange} placeholder="Enter Email"></input>
                        </div>
                        <div className="mb-4">
                            <label className="block text-grey-700">Password</label>
                            <input className="w-full px-3 py-2 border" type="password" name="password" value={input.password} onChange={handleChange} placeholder="Enter Password"></input>
                        </div>
                        <button className="w-full bg-green-600 text-white py-2">Sumbit</button>
                    </form>
                    <div className="text-center">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-indigo-500">Login</Link>
                    </div>
                </div>
            </div>
        )

}

export default Signup