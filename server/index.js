const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//app.use(express.json());
app.use(require('cors')())
require('./routes/index.js')(app);




app.listen(1991, ()=>{
    console.log('1991端口启动成功......');
});