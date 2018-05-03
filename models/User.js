const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR ? process.env.SALT_WORK_FACTOR : 10

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
    }
})

schema.pre('save', async function updatePassword (next) {
    var user = this

    if (!user.isModified('password')) return next()
    
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const hash = await bcrypt.hash(user.password, salt)

        user.password = hash
        next()
    } catch (err) {
        return next(err)
    }
})

schema.methods.comparePassword = function comparePassword (candidatePassword, cb) {
    return new Promise(async (resolve, reject) => {
        try {
            const match = bcrypt.compare(candidatePassword, this.password)
            resolve(isMatch)
        } catch (err) {
            reject(err)
        }
    })
};

module.exports = mongoose.model('User', schema)