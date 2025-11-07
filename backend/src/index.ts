import  express, {Request, Response}  from "express";

const app = express()

app.listen(1447, ()=>console.log("listining"))

app.get('/', (req: Request, res: Response) => {
    console.log('req')
    res.send('<h1 style="text-align: center; font-size:3rem;">Hi!</h1>')
})