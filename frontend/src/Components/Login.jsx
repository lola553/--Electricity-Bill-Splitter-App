import { useState } from "react"
import {Link , useNavigate} from "react-router-dom"
import axios from "axios"

function Login(){
    
    const [input , setInput] = useState({
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
            const response = await axios.post('http://localhost:3000/auth/login', input)
            
            if (response.status === 201){
                localStorage.setItem("token" , response.data.token)
                navigate("/")
            }

        } catch(err){
            console.log(err.message)
        }
        
    }
    
    

    
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="shadow-lg px-8 py-5 border w-96">
                    <h2 className="text-lg font-bold mb-4">Login</h2>
                    <form onSubmit={handleClick}>
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
                    <span>Dont have an account?</span>
                    <Link to="/signup" className="text-indigo-500">Signup</Link>
                    </div>
                </div>
            </div>
        )

}

export default Login
