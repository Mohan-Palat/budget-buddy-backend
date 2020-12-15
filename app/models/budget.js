const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = Schema({
    budgetname: { type: String, unique: true, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    wages: Number,
    rent: Number,
    grocery: Number,
    insurance: Number,
    phonebill: Number,
    carpayment: Number,
    gasoline: Number,
    others: Number,
    total: Number,
    createdOn: { type: Date, default: Date.now },
}, {
    timestamps: true,
})

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget