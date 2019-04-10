'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// const nameSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
// });

// const commentSchema = mongoose.Schema({
//     content: String
// });

const formSchema = mongoose.Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: {
        streetName: { type: String },
        city: { type: String },
        state: { type: String },
        zipcode: { type: Number }
    },
    monthlyRent: { type: Number },
    comments: { type: String },
    leaseRemainder: {
        count: Number,
        dayOrMonth: String
    },
    created: { type: Date, default: Date.now }
});

// formSchema.virtual('newName').get(function() {
//     return `${this.name.firstName} ${this.name.lastName}`.trim();
// });

// formSchema.virtual('newAddress').get(function() {
//     return `${this.address.streetName}
//     ${this.address.city}, ${this.address.state} ${this.address.zipcode}`.trim();
// });


formSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: {
            firstName: this.firstName,
            lastName: this.lastName
        },
        address: {
            streetName: this.streetName,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode
        },
        phone: this.phone,
        email: this.email,
        monthlyRent: this.monthlyRent,
        comments: this.comments.content,
        leaseRemainder: this.leaseRemainder,
        created: this.created
    };
};

// const User = mongoose.model('User', nameSchema);
const Form = mongoose.model('Form', formSchema);



module.exports = { Form };



