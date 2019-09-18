const express = require('express');
const minify = require('express-minify');
const compression = require('compression');
const routes = require('./routes/routes');
const { PATH_IMAGES } = require('./config/paths');
const { PORT } = require('./config/server');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(compression());
app.use(minify());
app.use(express.json());
app.use(express.static(PATH_IMAGES));
app.use(routes);

app.listen(PORT, () => console.log(`Executando na porta ${PORT}`));