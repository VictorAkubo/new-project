var express = require('express');
var path = require('path');
const sql = require('mysql')
//let db = require('./db_config')
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);

const db = sql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'vict'
});
db.connect((err)=>{
    if(err){
        throw new Error('unable to acces database')
    }else{
        console.log('database accessed')
    }
})
app.get('/createDB',(req,res)=>{
  let sql = 'CREATE DATABASE users'
  db.query(sql,(err,result)=>{
    if(err) throw err;
    res.send('database created..')
  })
})
app.get('/createpost',(req,res)=>{
  //let add = {username:'victorpaul',password:'nomyname'}
  let sql ='CREATE TABLE post(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id)) ';
  db.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send('new table inserted')
    })
})
app.get('/createbody',(req,res)=>{
  let body = {
    title:'learn DB',
    body:'why dont you learbn db with me'
  }
  let sql = 'INSERT INTO post SET ?'
  db.query(sql,body,(err,result) => {
    if(err) throw err;
    console.log(result)
    res.send('body created')
  })
})
app.get('/getpost/:id',(req,res)=>{
  let sql = `SELECT * FROM post WHERE id = ${req.params.id}`
  db.query(sql,(err,result) => {
    if(err) throw err;
    console.log(result)
    res.send('post fetched id')
  })
})
app.get('/newpost/:id',(req,res)=>{
  let newUpdate = {
    title :'Update me',
    body : 'send to me'
}
  let sql = `UPDATE post SET ? WHERE id = ${req.params.id} `;
  let query = db.query(sql,newUpdate,(err,result) => {
    if(err) throw err;
    console.log(result)
    res.send('post updated')
  })
})

const PORT = process.env.PORT || 45000
app.listen(PORT,()=>{
 console.log(`server runnimg on port${PORT}`) 

})
