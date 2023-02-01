const Employee = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no "firstName" arg or not string', () => {
        const emp = new Employee({
            lastName: `Doe`,
            department: `IT`
        });

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
        });

        const emp2 = new Employee({
            firstName: [],
            lastName: `Doe`,
            department: `IT`
        });

        emp2.validate(err => {
            expect(err.errors.firstName).to.exist;
        });

    });

    it('should throw an error if no "lastName" arg or not string', () => {
        const emp = new Employee({
            firstName: `Doe`,
            department: `IT`
        });

        emp.validate(err => {
            expect(err.errors.lastName).to.exist;
        });

        const emp2 = new Employee({
            firstName: `John`,
            lastName: [],
            department: `IT`
        });

        emp2.validate(err => {
            expect(err.errors.lastName).to.exist;
        });

    });

    it('should throw an error if no "firstName" arg or not string', () => {
        const emp = new Employee({
            firstName: `John`,
            lastName: `Doe`,
        });

        emp.validate(err => {
            expect(err.errors.department).to.exist;
        });

        const emp2 = new Employee({
            firstName: `John`,
            lastName: `Doe`,
            department: []
        });

        emp2.validate(err => {
            expect(err.errors.department).to.exist;
        });

    });


    it('should not throw an error if employee is okay', () => {

        const emp = new Employee({
            firstName: `John`,
            lastName: `Doe`,
            department: `IT`
        });

        emp.validate(err => {
            expect(err).to.not.exist;
        });



    });

});

after(() => {
    mongoose.models = {};
});