const Product = require('../models/products.model');

exports.getAll = async (req, res) => {

    try {
        res.json(await Product.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}


exports.getRandom = async (req, res) => {

    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Product.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.getById = async (req, res) => {

    try {
        const dep = await Product.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.postAll = async (req, res) => {

    try {

        const { name } = req.body;
        const newProduct = new Product({ name: name });
        await newProduct.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.putById = async (req, res) => {
    const { name } = req.body;

    try {
        await Product.updateOne({ _id: req.params.id }, { $set: { name: name } });

        const dep = await Product.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.deleteById = async (req, res) => {

    try {
        const dep = await Product.findById(req.params.id);
        if (dep) {
            await Product.deleteOne({ _id: req.params.id });

            const dep = await Product.findById(req.params.id);
            if (!dep) res.status(404).json({ message: 'Not found' });
            else res.json(dep);

        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}