const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        default: 'Crime Title'
    },
    category: {
        type: String,
        enum: ['Crime against person(s)', 'Crime against property', 'Hate crime', 'Crime against morality', 'White-Collar crime', 'Organized crime'],
        required: [true, 'Please provide a category']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a creator']
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'responded'],
        default: 'pending'
    },
    media: [{
        type: String
    }],
    location: {
        type: String,
        require: [true, 'Please provide the location']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        minLength: 20
    },
    response: { type: String }

}, { timestamps: true })

module.exports = mongoose.model('Report', ReportSchema)