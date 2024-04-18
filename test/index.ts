import { $ } from "bun"
import express from 'express'
import { v4 as uuid } from "uuid"
import cors from 'cors'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
async function getfiles () {
    const data = []
    const files = (await $`ls files`.text()).trim().split("\n")
    if (files.length > 0) {
        for (const file of files) {
            const content = await $`cat files/${file}`.text()
            data.push({ file, content })
        }
    }
    return data
}


app.post('/ls', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = req.body.command
        const createfile = await $`ls ${data}`.text()
        res.send(createfile)
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.post('/cat', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = req.body.command
        const createfile = await $`cat < ${data}`.text()
        res.send(createfile)
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})

app.post('/echo', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data1 = req.body.content
        const data2 = req.body.file
        const createfile = await $`echo ${data1} > ${data2}`.text()
        res.send(createfile)
    } catch (error) {
        console.log(error)
        res.send(`${error}`)
    }

})


app.get('/gettodos', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = await getfiles()
        res.send(JSON.stringify(data))
    } catch (error) {
        console.log(error)
        res.send("error")
    }

})


app.post('/test', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = await $`echo ${req.body.command} > files/g`.text()
        res.send(JSON.stringify(data))
    } catch (error) {
        console.log(error)
        res.send("error")
    }

})
app.get("/createsession", async (req: any, res: { send: (arg0: string) => void }) => {
    const id: string = uuid()
    res.send(id)
})
app.listen(port, () => {
    console.log(`ctf ${port}`)
})
