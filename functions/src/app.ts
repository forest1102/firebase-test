// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'
import * as swig from 'swig'
import * as path from 'path'
import * as express from 'express'

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
      .then(codes=>{
        return res.json(codes.val())
      })
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

// .put('/addcode-from/:id',(req,res)=> {
// 
// })
// 
// .post('/code',(req,res)=>{
// 
// })
// 
// .get('/code-from/:id',(req,res)=>{
// 
// })

export default app
