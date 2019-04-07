'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const nameSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
});

const commentSchema = mongoose.Schema({
    content: String
});

const formSchema = mongoose.Schema({
    name: [nameSchema],
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: {
        streetName: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: Number, required: true }
    },
    comments: [commentSchema],
    leaseRemainder: {
        count: Number,
        dayOrMonth: String
    },
    created: { type: Date, default: Date.now }
});

formSchema.pre('find', function(next) {
    this.populate('user');
    next();
});
  
formSchema.pre('findOne', function(next) {
    this.populate('user');
    next();
});

formSchema.virtual('newName').get(function() {
    return `${this.name.firstName} ${this.name.lastName}`.trim();
});

formSchema.virtual('newAddress').get(function() {
    return `${this.address.streetName}
    ${this.address.city}, ${this.address.state} ${this.address.zipcode}`.trim();
});


formSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: this.newName,
        address: this.newAddress,
        phone: this.phone,
        email: this.email,
        comments: this.comments,
        leaseRemainder: this.leaseRemainder,
        created: this.created
    };
};

const User = mongoose.model('User', nameSchema);
const Form = mongoose.model('Form', formSchema);



module.exports = { Form };



