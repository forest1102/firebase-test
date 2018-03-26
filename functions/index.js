const exec = require('child_process').exec
const express = require('express');
const app = express()
const functions = require('firebase-functions')
const swig = require('swig');
const path = require('path');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
app.engine('html', swig.renderFile);
app.use('/static',express.static(path.join(__dirname,'static')))
app.set('view engine', 'html');
app.set('views', path.join(__dirname,'templates'));
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/',(req,res)     => res.render('index.html',{
  title:'ポチポチ'
}))

app.get('/form',(req,res) => res.render('form.html',{
  title:'コマンド設定'
}))

app.get('/codes',(req,res)=>{
  return admin.database().ref('/codes').  
    once("value")
    .then(codes=>{
      return res.send(JSON.stringify(codes.val()))
    })
})
app.put('/addcode',(req,res)=>{
  const {phrase,code}=req.query
  return admin.database().ref('/codes')
    .update({
      [phrase]:code
    })
    .then(code=>{
      return res.send(JSON.stringify({phrase,code}))
    })
})

app.put('/addcode-from/:id',(req,res)=> {
    
})

app.post('/code',(req,res)=>{
  
})

app.get('/code-from/:id',(req,res)=>{
  
})

exports.ir=functions.https.onRequest(app)


