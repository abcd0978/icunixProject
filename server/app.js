const express = require('express');
const app = express();//서버
const dotenv = require('dotenv').config();
const port = process.env.PORT;

app.use(express.json())//서버가 사용할 미들웨어
app.use(express.urlencoded({extended:true}))

const server = app.listen(port, ()=>{
    console.log(`${port}번 포트에서 백엔드 서버가 돌아가는중`)
  })

app.get('/',(req,res)=>{
    res.send('hello world!')
})

app.get('/get',(req,res)=>{
    const name = req.query.name;
    res.send(`안녕하세요 ${name}님! \n 당신의 이름은 쿼리스트링으로 보내졌습니다.`)
})

app.post('/post',(req,res)=>{
    const name = req.body.name
    res.send(`안녕하세요 ${name}님! \n 당신의 이름은 http body에 담아 보내졌습니다.`)
})