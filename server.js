'use strict'

const express =require('express');

const server= express();

const PORT =3001;

//localhost:3001/test
server.get('/test')

server.listen( PORT,()=>{
console.log(`listning on port ${PORT}`)
})
