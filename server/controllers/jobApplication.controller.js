import JobApplication from "../mongodb/models/jobApplication.js";

const getAllJobApplication = async (req, res) => {
  try {
    const Data = await JobApplication.find({}).limit(req.query._end);
    res.status(200).json(Data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJobApplication = async (req, res) => {
  try {
    const { creator: userId, job: jobId } = req.body;
    const jobApplicationId = req.params.id;

    const jobApplicationExists = await JobApplication.findOne({ _id: jobApplicationId });

    if (jobApplicationExists) {
      return res.status(200).json(jobApplicationExists);
    }

    const newJobApplication = await JobApplication.create({
      creator: userId,
      job: jobId,
    });

    res.status(200).json(newJobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export { getAllJobApplication, createJobApplication };
