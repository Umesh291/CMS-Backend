import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, required: true,
        set: (password) => {
            const saltKey = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(password, saltKey);
        }
    },
});



const User = mongoose.model('User', UserSchema);

User.checkPassword = (encryptedPass, password) => {
    return bcrypt.compareSync(encryptedPass, password);
}
export default User;