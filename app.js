var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.set('view engine',"ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(methodOverride('_method'));





var entries = [
 /* {
    title : "Lorem Ipsum",
    body : `Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit, sed
     do eiusmod tempor` ,
    published : new Date().toDateString()
   }
   */
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

app.delete('/:entrytitle', function(req, res){
 var title = req.params.entrytitle;
 entries = entries.filter(entry => {
  
    return entry.title !== title;
    
  });

  res.render('index.ejs',{entries})
    console.log(entries)
  
  
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
  console.log("Express app running on port 3000...")
})
