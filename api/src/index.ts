import express from 'express';
import Cors from 'cors'

import exampleRouter from './routes/example'

const app = express();
const origin = () => {
    if (process.env.PROJECT_ENV === 'docker') return process.env.HOST_URL
    return ['http://localhost:3000', 'http://localhost:3001']
}
const cors = {origin: origin(), credentials: true}
app.set('trust proxy', true)
app.use(Cors(cors))

app.use('/', exampleRouter)


app.get('/', (req, res) => {
    res.json({success: true})
})

const port = process.env.PROJECT_ENV === 'docker' ? 80 : 5000
app.listen(port, () => console.log(`API is listening at port ${port}`))
