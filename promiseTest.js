let MyPromise = require('./promise.js')
let p1 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(100)
    },1000)
})

let p2 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(200)
    },500)
})
let p3 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(300)
    },3000)
})
MyPromise.all([p1,p2,p3]).then(result=>{
    console.log(result)
}).catch(reason=>{
    console.log(reason)
})