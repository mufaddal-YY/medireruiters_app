import JobApplication from "../mongodb/models/jobApplication.js";

const getAllJobApplication = async (req, res) => {
  try {
    const Data = await JobApplication.find({}).limit(req.query._end);
    res.status(200).json(Data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllJobApplication };