var express = require('express');
var router = express.Router();
var appdata = require("../data.json");
var app = express();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
  var myArtWork = [];
  var myArtists = [];
  myArtists = appdata.speakers; //here we passed all the information about the speakers into this array. 

  appdata.speakers.forEach(item => {
    myArtWork = myArtWork.concat(item.artwork);
  });
  
  res.render('index', {
    title: 'Home',
    artwork: myArtWork,
    artists: myArtists,  // here we send all the speakers data from data.json file to the artists property, which will be the same way we handle data into the '/speakers' route.
    page: "home"
  });
});

//GET home page
router.get('/speakers', function (req, res) {
  var myArtWork = [];
  var myArtists = [];
  myArtists = appdata.speakers; 
  appdata.speakers.forEach(item => {
    myArtWork = myArtWork.concat(item.artwork);
  });

//GET speakers page
  res.render('speakers', {
    title: 'Speakers',
    artwork: myArtWork,
    artists: myArtists,
    page: "artistlist"
  });
});
router.get('/speakers/:speakerid', function (req, res) {
  var myArtWork = [];
  var myArtists = [];
  
  appdata.speakers.forEach(item => {
    if (item.shortname == req.params.speakerid) {
      myArtWork = myArtWork.concat(item.artwork);
      myArtists.push(item);
    }  
    
  });

  res.render('speakers', {
    title: 'Speakers',
    artwork: myArtWork,
    artists: myArtists,
    page: 'artistDetail'
  });
});


// dealing with the post
app.use(express.json());
app.use(express.urlencoded());

router.post('/', (req, res, next) => {
  console.log('Here =>',req.body);

  //res.write(`<style>body{height: 100%; width: 100%; color: rgb(214, 214, 214); display: grid; place-items: center; background: linear-gradient(to bottom, rgb(102, 90,247), rgb(114, 98, 206))}</style><h2>Thanks for submitting the form: <b>Mr. ${req.body.name}.</b></h2>`);
  res.end();
})

module.exports = router;