var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true}))



var entries = [
  {
    title : "Lorem Ipsum",
    body : `Lorem ipsum dolor sit amet, 
           consectetur adipiscing elit, sed
           do eiusmod tempor incididunt ut 
           labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud 
           exercitation ullamco laboris nisi ut aliquip ex 
          ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur` ,
    published : new Date().toDateString()
   }
];


// The line below makes entries available in all views

app.locals.entries = entries;


app.get('/', function(req, res){
  res.render('index.ejs')
});


app.get('/new', function(req, res){
  res.render('new.ejs')
});


app.post('/new', checkPostValidity,function(req, res){
   res.redirect('/')
});

app.use(function(req, res){
  res.render("404.ejs")
});



function checkPostValidity(req, res, next){
  var title = req.body.title;
  var body = req.body.body;

  if(!title || !body){
    res.status(400);
    res.end("Entry must have a title and body");
    return;
  } else {
    entries.push(
      {
       title : title,
       body : body,
       published : new Date().toDateString()
      }
  );
    next();
  };
}



app.listen(3000, function(){
  console.log("Server running...")
})
