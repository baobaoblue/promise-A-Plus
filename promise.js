class MyPromise{
    constructor(excutorCallback){
        this.status = 'pending'
        this.value = undefined
        this.fulfilledArr = []
        this.rejectedArr = []
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledArr.forEach(item => item(result));
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedArr.forEach(item => item(reason));
            }, 0);
        };
        try{
            excutorCallback(resolveFn,rejectFn)
        }catch(err){
            rejectFn(err)
        }
    } 
    then(fulfilledCallBack,rejectedCallBack){
        typeof fulfilledCallBack !== 'function'? fulfilledCallBack = result => result : null
        typeof rejectedCallBack !== 'function'? rejectedCallBack = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason)
        } : null
        return new MyPromise((resolve, reject) => {
            this.fulfilledArr.push(() => {
                try {
                    let x = fulfilledCallBack(this.value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
            this.rejectedArr.push(() => {
                try {
                    let x = rejectedCallBack(this.value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (e) {
                    reject(e);
                }
          });
        })
    }
    catch(rejectedCallBack){
        return this.then(null,rejectedCallBack)
    }
    static all(promiseArr = []){
        return new MyPromise((resolve,reject)=>{
            let index = 0
            let result = []
            for(let i = 0 ; i < promiseArr.length ;  i++){
                promiseArr[i].then(val =>{
                    index++
                    result[i] = val
                    if(index === promiseArr.length){
                        resolve(result)
                    }
                },reject)
            }
        })
    }
}
module.exports = MyPromise 