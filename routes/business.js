// HOYLRAM 19.04.2021
const businessModel = require("../models/business")
const router = async (fastify, options, done) => {

    fastify.post("/create", options, async (req, res) => {
        const { name, price, input } = req.body
        if (name && price && input) {
            const instance = new businessModel({
                name: name,
                price: price,
                input: input,
                originalName: name,
                originalPrice: price,
                colshape1: colshape1
            })
            instance.save()
            return res.send({ result: true })
        } else {
            return res.code(404).send({ result: { message: "Already created or required params are lack of." } })
        }
    })

    fastify.post("/match", options, async (req, res) => {
        const isExist = await businessModel.exists({ _id: req.body._id })
        if (isExist && req.body._id) {
            const data = await businessModel.findOne({ _id: req.body._id }).exec()
            return res.code(200).send(data)
        }
        else {
            return res.code(404).send({ result: { message: "Error." } })
        }
    })

    fastify.get("/get/:type", options, async (req, res) => {
        if(req.params.type === 'all') {
           const result = await businessModel.find()
           return res.code(200).send(result)
        } else return res.code(400).send(false)
    })

    fastify.post("/update", options, async (req, res) => {
        const isExist = await businessModel.exists({ _id: req.body._id })
        if (isExist) {
            const data = await businessModel.findOneAndUpdate({ _id: req.body._id }, req.body.data, {
                new: true,
            });
            return res.code(200).send(data)
        }
        else {
            return res.code(404).send({ result: { message: "Error." } })
        }
    })
    
    done()
}
module.exports = router