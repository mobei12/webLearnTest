const fs  = require('fs');

const promise = new Promise((resolve,reject)=>{
    fs.readFile('./README.md',(err,data)=>{
        if(err) reject(err);
        resolve(data);
    })
})
promise.then((data)=>{
    console.log(data.toString());
},(err)=>{
    console.log(err);
})
