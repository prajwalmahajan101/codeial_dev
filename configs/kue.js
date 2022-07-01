const kue = require('kue')
let env = {}
try {
    env = require('../env')
}catch (err){

}

const queue = kue.createQueue()
// const queue = kue.createQueue({
//     prefix: 'q',
//     redis: {
//         port: env.redistPort || process.env.redisPort,
//         host: env.redisServer || process.env.redisServer,
//         auth: env.redisPass || process.env.redisPass,
//     }
// });

module.exports = queue