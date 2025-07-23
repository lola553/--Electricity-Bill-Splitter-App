import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"

function App(){
    
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      )   

}

export default App