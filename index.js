require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

/////////////////////////////////////////////////////////////////////////////
// My additions
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const existingUrls = [];

app.post("/api/shorturl", function(req, res, next)
{
  // Making sure the url is valid at first
  if(!req.body.url.includes("http"))
  {
    return res.json({
      error: "invalid url"
    });
  }

  next();   //Continuing with a valid url
},
function(req, res)
{
  if(existingUrls.includes(req.body.url))
  {
    return res.json({
      url: req.body.url,
      index: existingUrls.indexOf(req.body.url) + 1
    });
  }

  existingUrls.push(req.body.url);

  res.json({
    original_url: req.body.url,
    short_url: existingUrls.indexOf(req.body.url) + 1
  });
});

app.get("/api/shorturl/:shortUrl", function(req, res)
{
  if(existingUrls.length < req.params.shortUrl)
  {
    return res.json({
      error: "invalid url"
    });
  }
  res.redirect(existingUrls[Number(req.params.shortUrl) - 1]); 
});
/////////////////////////////////////////////////////////////////////////////

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
