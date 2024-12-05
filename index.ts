
import express,{Request,Response,Express} from "express";
const app:Express = express();
const port:string|number = process.env.PORT||3000;

app.get('/articles', (req:Request, res:Response) => {
    res.json({
        articles:[]
    })
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});