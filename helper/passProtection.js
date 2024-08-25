const bcrypt = require('bcrypt');

const hashing = async (password) => {
    const saltRound = 7;
    const hashed = await bcrypt.hash(password, saltRound);
    return hashed;
}

const comparePassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = { hashing, comparePassword }