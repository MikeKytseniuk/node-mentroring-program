const express = require('express');
const app = express();
const { service } = require('./config/config');

require('./api/swagger/index')(app);
require('./api/middleware/swagger-ui')(app);
require('./api/middleware/http-error')(app);

app.listen(service.port, () => { `Server listening on port ${service.port}` });

