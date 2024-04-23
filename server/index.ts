import { $ } from "bun"
import express from 'express'
import { v4 as uuid } from "uuid"
import cors from 'cors'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
const sessions  = new Set()
app.post('/ls', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        if(sessions.has(req.query.auth)){
            const data = req.body.path
            const createfile = await $`ls ${req.query.auth}`.text()
            res.send(createfile)
        }else{
            res.send("noauth")
        }
        
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.post('/cat', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        if(sessions.has(req.query.auth)){
            const data = req.body.path
            if(data!==""){
                const createfile = await $`cat < ${req.query.auth}/${data}`.text()
                res.send(createfile)
            }else{
                res.send("")
            }
        }else{
            res.send("noauth")
        }
       
        
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.post('/echo', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        if(sessions.has(req.query.auth)){
            const data1 = req.body.content
            const data2 = req.body.file
            const createfile = await $`echo ${data1} > ${req.query.auth}/${data2}`.text()
            res.send(createfile)
        }else{
            res.send("noauth")
        }
        
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.get("/createsession", async (req: any, res: { send: (arg0: string) => void }) => {
    const id: string = uuid()
    sessions.add(id)
    const createfile = await $`mkdir ${id}`.text()
    res.send(id)
})
app.listen(port, () => {
    console.log(`ctf ${port}`)
})
