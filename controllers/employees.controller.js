const Employees = require('../models/employees.model');

exports.getAll = async (req, res) => {

    try {
        const emp = await Employees.find().populate(`department`);
        if (emp && emp.length) {
            res.json(emp)
        }

    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}


exports.getRandom = async (req, res) => {

    try {
        const count = await Employees.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Employees.findOne().skip(rand).populate(`department`);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.getById = async (req, res) => {

    try {
        const dep = await Employees.findById(req.params.id).populate(`department`);
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
        const newEmployees = new Employees({ name: name });
        await newEmployees.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.putById = async (req, res) => {
    const { name } = req.body;

    try {
        await Employees.updateOne({ _id: req.params.id }, { $set: { name: name } });

        const dep = await Employees.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.deleteById = async (req, res) => {

    try {
        const dep = await Employees.findById(req.params.id);
        if (dep) {
            await Employees.deleteOne({ _id: req.params.id });

            const dep = await Employees.findById(req.params.id);
            if (!dep) res.status(404).json({ message: 'Not found' });
            else res.json(dep);

        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}