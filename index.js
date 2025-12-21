const express = require('express');
const app = express()
const port = process.env.PORT || 3002

app.get('/', (req, res)=>{
    res.send("user is coming")
})

app.listen(port, ()=>{
    console.log(`data is coming form port : ${port}`)
})
