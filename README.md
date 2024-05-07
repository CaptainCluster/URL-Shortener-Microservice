# URL Shortener Microservice

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

URL Shortener Microservice is the 3rd project for FreeCodeCamp *Back End Development and APIs* course. A post request allows the reception of the URL
sent by the user and the allocation of an index. The index can then be used in a GET request, allowing a redirection to a page with a single number.

🙏 Credits
---
![FreeCodeCamp](https://img.shields.io/badge/Freecodecamp-%23123.svg?&style=for-the-badge&logo=freecodecamp&logoColor=green)

Everything **not** written by me has been cloned from [this GitHub repository](https://github.com/freeCodeCamp/boilerplate-project-urlshortener/).

The default README that comes with the cloned repository:
> This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

Here is the solution I wrote for this project:
```
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
```



