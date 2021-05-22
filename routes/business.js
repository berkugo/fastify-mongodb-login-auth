// HOYLRAM 19.04.2021
const businessModel = require("../models/business")
const router = async (fastify, options, done) => {

    fastify.post("/create", options, async (req, res) => {
        const { id, name, price, input, colshape } = req.body
        if (id && name && price && input && colshape) {
            const instance = new businessModel({
                id: id,
                name: name,
                price: price,
                input: input,
                originalName: name,
                originalPrice: price,
                colshape: colshape
            })
            instance.save()
            return res.send({ result: true })
        } else {
            return res.code(404).send({ result: { message: "Already created or required params are lack of." } })
        }
    })

    fastify.post("/match", options, async (req, res) => {
        const isExist = await businessModel.exists({ id: req.body.id })
        if (isExist && req.body.id) {
            const data = await businessModel.findOne({ id: req.body.id }).exec()
            return res.code(200).send(data)
        }
        else {
            return res.code(404).send({ result: { message: "Error." } })
        }
    })

    fastify.get("/get/:type", options, async (req, res) => {
        if (req.params.type === 'all') {
            const result = await businessModel.find()
            return res.code(200).send(result)
        } else return res.code(400).send(false)
    })

    fastify.post("/update", options, async (req, res) => {
        const isExist = await businessModel.exists({ id: req.body.id })
        if (isExist) {
            const data = await businessModel.findOneAndUpdate({ id: req.body.id }, req.body.data, {
                new: true,
            });
            return res.code(200).send(data)
        }
        else {
            return res.code(404).send({ result: { message: "Error." } })
        }
    })

    fastify.post("/add", options, async (req, res) => {
        const isExist = await businessModel.exists({ id: req.body.id })
        if (isExist) {
            var obj = eval('({"' + req.body.array + '":' + JSON.stringify(req.body.data) + '})');
            var data = await businessModel.update(
                { id: req.body.id },
                { $addToSet: obj }
            );
            return res.code(200).send(data.nModified !== 0 ? true : false)
        }
        else {
            return res.code(404).send({ result: { message: "Error." } })
        }
    })

    fastify.post("/remove", options, async (req, res) => {
        const isExist = await businessModel.exists({ id: req.body.id })
        if (isExist) {
            var obj = eval('({'+ req.body.array + ': {' + Object.keys(req.body.data)[0] + ': "' + Object.values(req.body.data)[0] + '"}})');
            var data = await businessModel.update(
                { id: req.body.id },
                { $pull: obj }
            );
            return res.code(200).send(data.nModified !== 0 ? true : false)
        }
        else {
            return res.code(404).send({ result: { message: "Error." } })
        }
    })

    done()
}
module.exports = router
