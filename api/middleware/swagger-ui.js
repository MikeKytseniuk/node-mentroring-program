const swaggerUi = require('swagger-ui-express');
const parser = require('swagger-parser');
const path = require('path');

module.exports = async (app) => {
    const swagger = await parser.validate(path.join(process.cwd(), './api/swagger/index.yaml'));

    app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swagger));
};