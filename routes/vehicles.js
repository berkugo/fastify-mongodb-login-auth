const VehicleModel = require('../models/vehicles');

const router = (fastify, options, done) => {
  fastify.get('/', options, async (req, res) => {
    const result = await VehicleModel.find();
    return res.code(200).send(result);
  });

  // create vehicle
  fastify.post('/', options, (req, res) => {
    const { modelHash, owner, position, rotation, primaryColor, secondaryColor, plate } = req.body;
    if (modelHash && String(owner) && position && primaryColor && secondaryColor && plate) {
      const instance = new VehicleModel({
        modelHash,
        owner,
        position,
        rotation,
        primaryColor,
        secondaryColor,
        plate,
      });
      return instance.save().then((data) => {
        res.send({ result: data });
      });
    }
    return res.code(404).send({
      result: { message: 'Already created or could not find all required parameters.' },
    });
  });

  // update vehicle
  fastify.patch('/', options, async (req, res) => {
    const vehicleExist = await VehicleModel.exists({ _id: req.body._id });
    if (vehicleExist) {
      const data = await VehicleModel.findOneAndUpdate({ _id: req.body._id }, req.body, {
        new: true,
      });
      return res.code(200).send(data);
    }
    return res.code(404).send({ result: { message: 'Could not find all required parameters.' } });
  });

  // delete vehicle
  fastify.delete('/', options, async (req, res) => {
    const { _id } = req.body;
    if (_id) {
      const vehicleExist = await VehicleModel.exists({ _id });
      if (vehicleExist) {
        await VehicleModel.deleteOne({ _id });
        return res.code(200).send();
      }
      return res
        .code(404)
        .send({ result: { message: `Could not find a vehicle with the id ${_id}.` } });
    }
    return res.code(404).send({ result: { message: 'Could not find all required parameters.' } });
  });

  done();
};
module.exports = router;
