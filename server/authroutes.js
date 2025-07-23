import express from "express"
import connectToDatabase from "./db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/signup", async (req,res)=>{
    const {username , email , password} = req.body
    try{
        const db = await connectToDatabase()
        const [rows] = await db.query("SELECT * FROM authentication WHERE email=?" , [email])
        
        if (rows.length > 0){
            return res.status(409).json({message: "user already existed"})
        }

        const hashPassword = await bcrypt.hash(password , 10)
        await db.query("INSERT INTO authentication (username , email , password) VALUES(?,?,?)", [username , email , hashPassword] )

        return res.status(201).json({message: "user successfully registered"})

    }catch (err){
        return res.status(500).json(err.message)
    }

})

router.post("/login", async (req,res)=>{
    const { email , password} = req.body
    try{
        const db = await connectToDatabase()
        const [rows] = await db.query("SELECT * FROM authentication WHERE email=?" , [email])
        
        if (rows.length === 0){
            return res.status(404).json({message: "user not existed"})
        }

        const isMatch = await bcrypt.compare(password , rows[0].password)

        if (!isMatch){
            return res.status(401).json({message: "wrong password"})
        }
        
        const token = jwt.sign({id: rows[0].id} , process.env.SECURE_KEY , {expiresIn : "2h"})

        return res.status(201).json({token: token})

    }catch (err){
        return res.status(500).json(err.message)
    }

})

const verifyToken = async (req ,res ,next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1]
        if (!token){
            return res.stauts(403).json({message: "token not provided"})
        }
        const decoded = jwt.verify(token , process.env.SECURE_KEY)
        req.userId = decoded.id
        next()

    } catch(err){
        return res.status(500).json({message: "server error"})
    }
}

router.get("/home" , verifyToken , async (req , res ) =>{
    try{
        const db = await connectToDatabase()
        const [rows] = await db.query("SELECT * FROM authentication WHERE id=?" , [req.userId])
        
        if (rows.length === 0){
            return res.status(404).json({message: "user not existed"})
        }
        
        return res.status(201).json({user: rows[0]})
    } catch(err){
        res.status(500).json({message: "server error"})
    }
})


export default router