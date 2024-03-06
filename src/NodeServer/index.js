import express from 'express'
import fs from 'fs'
const app = express()
const port = 3000

app.get('/data', (req, res) => {
	const data = fs.readFileSync('./data.json', 'utf-8')
	res.send(data)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
