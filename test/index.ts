import { $ } from "bun"
import express from 'express'
const app = express()
const port = 3000
app.use(express.json())
async function getfiles () {
    const data = []
    const files = (await $`ls files`.text()).trim().split("\n")
    console.log(files)
    for (const file of files) {
        const content = await $`cat files/${file}`
        data.push({ file, content })
    }
    return data
}


app.post('/createfile', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        console.log(req.body)
        const { name, content } = req.body
        const test = await $`touch files/${name}`.text()
        const text = await $`echo ${content} > files/${name}`.text()
        res.send(test)
    } catch (error) {
        res.send("test")
    }

})

app.get('/getfiles', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const data = await getfiles()
        res.send(JSON.stringify(data))
    } catch (error) {
        res.send("error")
    }

})

app.listen(port, () => {
    console.log(`ctf ${port}`)
})
