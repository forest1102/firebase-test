// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'
import * as swig from 'swig'
import * as path from 'path'
import * as express from 'express'
import {exec,spawn} from 'child-process-promise'
const app = express()

swig.setDefaults({ cache: false })
app
  .engine('html', swig.renderFile)
  
  .use('/static',express.static(path.join(__dirname,'static')))
  
  .set('view engine', 'html')
  .set('views', path.join(__dirname,'templates'))
  .set('view cache', false)
  
  .get('/',(req,res)     => res.render('index.html',{
    title:'ポチポチ'
  }))

  .get('/form',(req,res) => res.render('form.html',{
    title:'コマンド設定'
  }))

  .get('/codes',(req,res)=>
    admin.database().ref('/codes').  
      once("value")
      .then(codes=>
        res.json(codes.val())
      )
  )
  .put('/addcode',(req,res)=>{
    const {phrase,code}=req.query
    return admin.database().ref('/codes')
      .update({
        [phrase]:code
      })
      .then(()=>{
        return res.json({phrase})
      })
  })

  .get('/code-from/:memo_no',(req,res)=>{
    const memo_no=req.params.memo_no
    return exec(`python python/remocon.py ${memo_no}`)
  })
// .put('/addcode-from/:id',(req,res)=> {
// 
// })
// 
// .post('/code',(req,res)=>{
// 
// })
// 

export default app
