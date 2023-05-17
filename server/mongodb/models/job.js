import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({

    name: { type: string, required: true},
    email: {type: string, required: true},
    avatar: {type:string, required: true},
    allJobs: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Jobs'}],
});

const jobModel = mongoose.model('user', JobSchema);

export default jobModel;