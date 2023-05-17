import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: { type: string, required: true},
    email: {type: string, required: true},
    avatar: {type:string, required: true},
    allJobs: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Jobs'}],
});

const userModel = mongoose.model('user', UserSchema);

export default userModel;