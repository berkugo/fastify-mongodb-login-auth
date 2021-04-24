const service = require('fastify')({ logger: true })
const playerRouter = require('./routes/players')
const vehicleRouter = require('./routes/vehicles')
const businessRouter = require('./routes/business');
const houseRouter = require('./routes/house');
const startDB = require('./db/db')
startDB();

service.register(require('fastify-cors'), { origin: true })

service.register(playerRouter, { prefix: '/player' })
service.register(vehicleRouter, { prefix: '/vehicle' })
service.register(businessRouter, { prefix: '/business' })
service.register(houseRouter, { prefix: '/house' })

service.listen(3000, '0.0.0.0', function (err, address) {
    if (err) {
        service.log.error(err)
        process.exit(1)
    }
    service.log.info(`server listening on ${address}`)
})
