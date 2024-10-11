const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});
client.set('visits', 1);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Welcome! You are the ' + visits + 'th visitor');
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});

