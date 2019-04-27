'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const formSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String },
    monthlyRent: { type: Number },
    comments: { type: String },
    leaseRemainder: { type: String },
    created: { type: Date, default: Date.now }
});

formSchema.methods.serialize = function() {
    return {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        phone: this.phone,
        email: this.email,
        monthlyRent: this.monthlyRent,
        comments: this.comments.content,
        leaseRemainder: this.leaseRemainder,
        created: this.created
    };
};

const Form = mongoose.model('Form', formSchema);

module.exports = { Form };



