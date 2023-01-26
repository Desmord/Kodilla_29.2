const Products = require('../models/products.model');
const express = require('express');
const router = express.Router();

router.get('/products', async (req, res) => {

  try {
    res.json(await Products.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.get('/products/random', async (req, res) => {

  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Products.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.get('/products/:id', async (req, res) => {

  try {
    const dep = await Products.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.post('/products', async (req, res) => {

  try {

    const { name } = req.body;
    const newDepartment = new Products({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }

});

router.put('/products/:id', async (req, res) => {

  const { name } = req.body;

  try {
    await Products.updateOne({ _id: req.params.id }, { $set: { name: name } });
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/products/:id', async (req, res) => {

  try {
    const dep = await Products.findById(req.params.id);
    if (dep) {
      await Products.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
