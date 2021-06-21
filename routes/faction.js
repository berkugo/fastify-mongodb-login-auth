// HOYLRAM 19.04.2021
const FactionModel = require('../models/faction');

const router = async (fastify, options, done) => {
  fastify.get('/', options, async (req, res) => {
    const result = await FactionModel.find();
    return res.code(200).send(result);
  });

  fastify.post('/create', options, async (req, res) => {
    const { name, type, ranks } = req.body;
    if (name && type && ranks) {
      const instance = new FactionModel({
        name,
        type,
        ranks,
      });
      const data = await instance.save();
      return res.code(200).send(data);
    }
    return res
      .code(404)
      .send({ result: { message: 'Already created or could not find all required parameters.' } });
  });

  fastify.post('/update', options, async (req, res) => {
    const isExist = await FactionModel.exists({ id: req.body.id });

    if (isExist) {
      const data = await FactionModel.findOneAndUpdate({ id: req.body.id }, req.body.data, {
        new: true,
      });
      return res.code(200).send(data);
    }
    return res.code(404).send({ result: { message: 'Could not find all required parameters.' } });
  });

  fastify.post('/add', options, async (req, res) => {
    const isExist = await FactionModel.exists({ id: req.body.id });
    if (isExist) {
      await FactionModel.update(
        { id: req.body.id },
        { $addToSet: { [req.body.array]: req.body.data } },
      );
      return res.code(200).send();
    }
    return res.code(404).send({ result: { message: 'Could not find all required parameters.' } });
  });

  fastify.delete('/', options, async (req, res) => {
    const { _id } = req.body;
    if (_id) {
      const vehicleExist = await FactionModel.exists({ _id });
      if (vehicleExist) {
        await FactionModel.deleteOne({ _id });
        return res.code(200).send();
      }
      return res
        .code(404)
        .send({ result: { message: `Could not find a faction with the id ${_id}.` } });
    }
    return res.code(404).send({ result: { message: 'Could not find all required parameters.' } });
  });

  done();
};
module.exports = router;
