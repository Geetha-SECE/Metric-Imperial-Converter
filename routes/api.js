
const express = require('express');
const ConvertHandler = require('../controllers/convertHandler');

const router = express.Router();
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;

  if (typeof input !== 'string' || input.length === 0) {
    return res.json({ error: 'invalid input' });
  }

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  const numInvalid = initNum === 'invalid';
  const unitInvalid = initUnit === 'invalid';

  if (numInvalid && unitInvalid) {
    return res.json({
      error: 'invalid number and unit'
    });
  }

  if (numInvalid) {
    return res.json({
      error: 'invalid number'
    });
  }

  if (unitInvalid) {
    return res.json({
      error: 'invalid unit'
    });
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);

  const string = convertHandler.getString(
    initNum,
    initUnit,
    returnNum,
    returnUnit
  );

  return res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string
  });
});

module.exports = router;
