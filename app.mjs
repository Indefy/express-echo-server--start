import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const { PORT, HOST } = process.env;

// console.log(process.env);

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use(morgan('dev'));
// URL: 'Default route'
app.get('/',  (req, res) => {
    res.status(200).send('Hello Express!')
})
// URL: '/users'
app.get('/users', (req, res,next) => {
    res.status(200).send('Get all Users')
})


// URL: '/search?q=query&category=books&page=1'
// Define req.query
app.get('/search', (req, res) => {

    const { q, category, page } = req.query;
  
    res.send(`Search query: ${q}, Category: ${category}, Page: ${page}`);
  });

  // URL: '/users/:id'
  //Define req.params
app.get('/users/:id', (req, res) => { 

    const userId = req.params.id;
  
    res.send(`User ID: ${userId}`);
  });
  
/// URL: '/posts/:postId/comments/:commentId'
app.get('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;

    res.send(`Post ID: ${postId}, Comment ID: ${commentId}`);
  });

//  req.body
// URL: '/echo/'
app.get('/echo', (req, res) => {
  let { message } = req.body;
  message = 'Hello Class!';

  const htmlResponse = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Echo Response</title>
  </head>
  <body>
  <h1>Echoing back message:</h1>
  <p>${message}</p>
  </body>
  </html>
  `;

  res.send(htmlResponse);
});

//   URL: 'posts/showName'  >>>>  and send back body with text JSON in this format:
//        {
//          "name": "arrmagedon"
//        }
app.post('/showName', (req, res) => {
    const { name } = req.body;
    res.send(`The name of the show is: ${name}`);
  });



// Send a custom 404 response
  app.use((req, res) => {
    res.status(404);

    res.send('<h1>404 -Page Not Found</h1><p>Error,Please enter a diffrent supported route.</p>');
  });
  

app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------
/*
### Challenge instructions

1. Install the `morgan` 3rd party middleware  
use the middleware in your app:  
         `app.use( morgan('dev') );`

2.  Define more routing functions that use
    - `req.query` - access the querystring part of the request url
    - `req.params` - access dynamic parts of the url
    - `req.body` - access the request body of a **POST** request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

3. return api json response
4. return html markup response
5. return 404 status with a custom response to unsupported routes


*/
