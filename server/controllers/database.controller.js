import DatabaseModel from "../mongodb/models/database.js";

const getAllDatabase = async (req, res) => {
  try {
    const databases = await DatabaseModel.find({}).limit(req.query._end);
    res.status(200).json(databases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDatabase = async (req, res) => {
  try {
    const { companyName, hrName, email, phone, requirement, location } =
      req.body;
    const databaseId = req.params.id;

    const databaseExists = await DatabaseModel.findOne({ _id: databaseId });

    if (databaseExists) {
      return res.status(200).json(databaseExists);
    }

    const newDatabase = await DatabaseModel.create({
      companyName,
      hrName,
      email,
      phone,
      requirement,
      location,
    });

    res.status(200).json(newDatabase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const updateDatabase = async (req, res) => {
  try {
    const databaseId = req.params.id;
    const updatedDatabase = await DatabaseModel.findByIdAndUpdate(
      databaseId,
      req.body,
      { new: true }
    );

    if (!updatedDatabase) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedDatabase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDatabase = async (req, res) => {
  try {
    const databaseId = req.params.id;

    const deletedDatabase = await DatabaseModel.findByIdAndRemove(databaseId);

    if (!deletedDatabase) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllDatabase, createDatabase, updateDatabase, deleteDatabase };
