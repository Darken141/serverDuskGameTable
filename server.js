const express = require("express")
const bodyParser = require("body-parser");
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl : true
    }   
})

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'postgres',
//       password : 'D63479614',
//       database : 'dusk-game-table'
//     }   
// })

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    db.select('*').from('games').orderBy('id')
    .then(data => {
        res.json(data)
    })
});


app.post('/change-game', (req,res) => {
    const { id, gamerunning} = req.body;
    
    db.select('*').from('games').where('id', '=', id)
    .update({
        gamerunning: gamerunning
    }).then(data => {
        if(data){
            res.json({ status: 'ok' })
           }
    }).catch(err => {
        res.status(400).json('unable to change number of running games');
    })
})

app.post('/change-game-name', (req, res) =>{
    const { id, name } = req.body;

    db.select('*').from('games').where('id', '=', id)
    .update({
        name: name
    }).then(data => {
        if(data){
            res.json({status: 'ok'})
        }
    }).catch(err => {
        res.status(400).json('unable to change game name');
    })
})

app.post('/change-buyin', (req, res) => {
    const { id, buyin } = req.body;

    db.select('*').from('games').where('id', '=', id)
    .update({
        buyin: buyin
    }).then(data => {
        if(data){
            res.json({status: 'ok'})
        }
    }).catch(err => {
        res.status(400).json('unable to change buyin');
    })
})

app.post('/change-seats', (req, res) => {
    const { id, seatsavailable} = req.body;

    db.select('*').from('games').where('id', '=', id)
    .update({
        seatsavailable: seatsavailable
    }).then(data => {
        if(data){
            res.json({status: 'ok'})
        }
    }).catch(err => {
        res.status(400).json('unable to change available seats');
    })
})

app.post('/change-waiting', (req, res) => {
    const { id, waiting} = req.body;

    db.select('*').from('games').where('id', '=', id)
    .update({
        waiting: waiting
    }).then(data => {
        if(data){
            res.json({status: 'ok'})
        }
    }).catch(err => {
        res.status(400).json('unable to change waiting list');
    })
})

app.get('/get-highhand', (req, res) => {
    db.select('*').from('highhand')
    .then(data => {
        res.json(data);
    })
})

app.post('/change-highhand', (req, res) => {
    const { id, highhand} = req.body;

    db.select('*').from('highhand').where('id', '=', id)
    .update({
        name: highhand
    }).then(data => {
        if(data){
            res.json({status: 'ok'})
        }
    }).catch(err => {
        res.status(400).json('unable to change high hand')
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is live on PORT ${process.env.PORT}`);
})

