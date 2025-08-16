const { default: mongoose } = require("mongoose");



const UserSchema= new mongoose.Schema({
       fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum: ["user", "admin"],
        default: "user"
    },
    apply:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apply" // Reference to the Apply model
    }
});

const Userdata = mongoose.models.user || mongoose.model("user", UserSchema);
module.exports = Userdata;