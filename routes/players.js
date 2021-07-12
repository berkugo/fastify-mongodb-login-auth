const UserModel = require('../models/users');

const router = async (fastify, options, done) => {
  fastify.get('/', options, async (req, res) => {
    const data = await UserModel.find();
    return res.code(200).send(data);
  });

  fastify.post('/create', options, async (req, reply) => {
    const alreadyExist = await UserModel.exists({ userName: req.body.userName });
    if (req.body.userName && req.body.userPass && req.body.characterName && !alreadyExist) {
      const instance = new UserModel({
        userName: req.body.userName,
        userPassword: req.body.userPass,
        characterName: req.body.characterName,
      });
      instance.save();
      return reply.send({ result: true });
    }
    return reply
      .code(404)
      .send({ result: { message: 'Already created or required params are lack of.' } });
  });

  fastify.post('/match', options, async (req, res) => {
    const playerExist = await UserModel.exists({ userName: req.body.userName });
    if (playerExist && req.body.userName && req.body.userPass) {
      const playerData = await UserModel.findOne({
        userName: req.body.userName,
        userPassword: req.body.userPass,
      }).exec();
      return res.code(200).send(playerData);
    }
    return res.code(404).send({ result: { message: 'Error.' } });
  });

  fastify.post('/filter', options, async (req, res) => {
    const playerExist = await UserModel.exists(req.body);
    if (playerExist) {
      const playerData = await UserModel.find(req.body).exec();
      return res.code(200).send(playerData);
    }
    return res.code(404).send({ result: { message: 'Error.' } });
  });

  fastify.patch('/', options, async (req, res) => {
    const playerExist = await UserModel.exists({ xid: req.body.xid });
    if (playerExist) {
      const data = await UserModel.findOneAndUpdate({ xid: req.body.xid }, req.body.data, {
        new: true,
      });
      return res.code(200).send(data);
    }
    return res.code(404).send({ result: { message: 'Error.' } });
  });

  done();
};

module.exports = router;
