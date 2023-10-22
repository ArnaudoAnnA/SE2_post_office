const app = require('../../index');

app.app.get('/tests/get', (req, res) =>
{
    res.status(200).end()
})



