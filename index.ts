import express, {Express, Request, Response} from "express"

const app: Express = express()
const port: number = 3000

//rest API
app.get("/articles", (req: Request, res: Response) => {
  res.json({
    articles: []
  })
})

app.listen(port, () => {
  console.log(`App listenning on port ${port}`)
})