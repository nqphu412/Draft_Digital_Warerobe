const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        username: {
            required: [true, 'Username is required'],
            type: String,
        },
        password: {
            required: [true, 'Password is required'],
        },
    },
);

//Hash password before saving the document
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 8);
});

//Compare password
UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.mongoose.model('User', UserSchema);