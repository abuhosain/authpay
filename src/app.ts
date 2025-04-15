import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cockieParser from 'cookie-parser' 

const app: Application = express()

// parser
app.use(express.json())
app.use(cockieParser())

// const allowedOrigins = [ "http://localhost:3000"]  
app.use(cors({origin : [ "http://localhost:3000"], credentials : true}))

 

// Test route
app.get('/', async (req: Request, res: Response) => {
  const message = 'Auth Pay server is running'
  res.send(message)
})
 

 

export default app
