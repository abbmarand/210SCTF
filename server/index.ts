import { $ } from "bun"
import express from 'express'
import { v4 as uuid } from "uuid"
import cors from 'cors'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.post('/ls', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = req.body.path
        const createfile = await $`ls ${data}`.text()
        res.send(createfile)
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.post('/cat', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = req.body.path
        if(data!==""){
            const createfile = await $`cat < files/${data}`.text()
            res.send(createfile)
        }else{
            res.send("")
        }
        
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.post('/echo', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data1 = req.body.content
        const data2 = req.body.file
        const createfile = await $`echo ${data1} > files/${data2}`.text()
        res.send(createfile)
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.get("/createsession", async (req: any, res: { send: (arg0: string) => void }) => {
    const id: string = uuid()
    res.send(id)
})
app.listen(port, () => {
    console.log(`ctf ${port}`)
})
