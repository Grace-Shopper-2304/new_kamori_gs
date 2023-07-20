const router = require('express').Router();
const  Users  = require('../db/models/Users.js');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await Users.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await Users.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
