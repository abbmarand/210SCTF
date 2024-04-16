import { $ } from "bun"
import express from 'express'
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


app.post('/createtodo', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const { name, content } = req.body
        console.log(req.body)
        const part1 = await $`touch files/${name}`.text()
        const part2 = await $` echo ${content} > files/${name}`.text()
        res.send(part2)
    } catch (error) {
        res.send("error")
    }

})

app.post('/gettodo', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const { name } = req.body
        const file = await $` cat ${name}`.text()
        res.send(file)
    } catch (error) {
        res.send("error")
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

app.listen(port, () => {
    console.log(`ctf ${port}`)
})
