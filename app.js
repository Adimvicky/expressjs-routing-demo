// Importing modules
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// Middleware
app.set('view engine',"ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(methodOverride('_method'));




// entries array stores the posts in memory

var entries = [

 /* 
 // Uncomment this to have some seed data(an initial post)
  {
    title : "Lorem Ipsum",
    body : `Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit, sed
     do eiusmod tempor` ,
    published : new Date().toDateString()
   }
   */
];


// The line below makes the entries array available in all views

app.locals.entries = entries;


// Routes

app.get('/', function(req, res){
  res.render('index.ejs',{entries})
});


app.get('/new', function(req, res){
  res.render('new.ejs',{entries})
});


app.post('/new', checkPostValidity,function(req, res){
   
   res.redirect('/')
});

app.delete('/:entrytitle', function(req, res){

 var title = req.params.entrytitle;

 entries = entries.filter(entry => {
  
    return entry.title !== title;
    
  });

  res.redirect('/')

});


app.use(function(req, res){
  res.render("404.ejs")
});


// Post validation middleware

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
       published :new Date().toLocaleTimeString() +" | "+ new Date().toDateString()
      }
  );
    next();
  };
}


// start the server

app.listen(3000, function(){
  console.log("Express app running on port 3000...")
})
