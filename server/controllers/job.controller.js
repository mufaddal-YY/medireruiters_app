import Job from "./../mongodb/models/job.js";

const getAllJobs = async (req, res) => {
  try {
    const Jobs = await Job.find({}).limit(req.query._end);
    res.status(200).json(Jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      qualification,
      experience,
      equipment,
      opd,
      occupancy,
      salary,
      holidays,
      conference,
      accommodation,
      lang,
      status,
    } = req.body;
    const jobId = req.params.id;

    const jobExists = await Job.findOne({ _id: jobId });

    if (jobExists) {
      return res.status(200).json(jobExists);
    }

    const newJob = await Job.create({
      jobTitle,
      qualification,
      experience,
      equipment,
      opd,
      occupancy,
      salary,
      holidays,
      conference,
      accommodation,
      lang,
      status,
    });

    res.status(200).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndRemove(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job Post not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobDetail = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllJobs, createJob, getJobDetail, updateJob, deleteJob };
