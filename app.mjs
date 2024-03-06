import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const { PORT, HOST } = process.env;

// console.log(process.env);

const app = express()


app.get('/',  (req, res) => {
    res.status(200).send('Hello Express!')
})

app.get('/users', (req, res,next) => {
    res.status(200).send('Get all Users')
})

app.use(morgan('dev'));

// '/search?food=burger&town=ashdod'

// Define req.query
app.get('/search', (req, res) => {

    const { q, category, page } = req.query;
  
    res.send(`Search query: ${q}, Category: ${category}, Page: ${page}`);
  });

//Define req.params
app.get('/users/:id', (req, res) => { 

    const userId = req.params.id;
  
    res.send(`User ID: ${userId}`);
  });
  

app.get('/posts/:postId/comments/:commentId', (req, res) => {

    const postId = req.params.postId;
    const commentId = req.params.commentId;
  
    res.send(`Post ID: ${postId}, Comment ID: ${commentId}`);
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
