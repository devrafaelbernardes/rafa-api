const server = require('./src/server');
const { PORT } = require('./src/config/server');

server.listen(PORT, () => console.log(`Server running at ${PORT}`));