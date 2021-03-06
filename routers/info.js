const infoRouter = require('express').Router()
const info = require('../models/info')


const getFlags = (flag) => {
    // console.log('flags', flag)
    if (Array.isArray(flag)) {
        return flag
    }
    if (flag) {
        return [flag]
    }
    return Object.keys(info)
}

infoRouter.get('/', async (req, res, next) => {
    try {
        // console.log('getInfo called')
        const flags = getFlags(req.query.flag)
        var data = {}
        for (const f of flags) {
            if (typeof info[f] !== 'function')
                throw new Error('Invalid flag: ' + f)
            data[f] = await info[f]()
        }
        res.json(data)
    } catch (error) {
        error.statusCode = 400
        return next(error)
    }
})

module.exports = infoRouter