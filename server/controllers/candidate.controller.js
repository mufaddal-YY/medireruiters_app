import Candidate from "./../mongodb/models/candidate.js";

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).limit(req.query._end);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCandidates = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      bio,
      phoneNumber,
      address,
      dob,
      gender,
      experiences,
      qualifications,
      creator,
    } = req.body;

    const candidateExists = await Candidate.findOne({ email });

    if (candidateExists) {
      return res
        .status(400)
        .json({ message: "Candidate with the provided email already exists" });
    }

    const newCandidate = await Candidate.create({
      firstName,
      lastName,
      email,
      bio,
      phoneNumber,
      address,
      dob,
      gender,
      experiences,
      qualifications,
      creator,
    });

    res.status(200).json(newCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const updateCandidates = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCandidates = async (req, res) => {
  try {
    const candidateId = req.params.id;

    const deletedCandidate = await Candidate.findByIdAndRemove(candidateId);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidateInfoById = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllCandidates,
  createCandidates,
  getCandidateInfoById,
  updateCandidates,
  deleteCandidates,
};
