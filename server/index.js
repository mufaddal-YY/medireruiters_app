import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import candidateRouter from './routes/candidate.routes.js';
import databaseRouter from './routes/database.routes.js';
import jobRouter from './routes/job.routes.js';
import blogRouter from './routes/blog.routes.js';
import jobApplicationRouter from './routes/jobApplication.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use('/api/v1/jobApplications', jobApplicationRouter);
app.use('/api/v1/databases', databaseRouter);
app.use('/api/v1/candidates', candidateRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/blogs', blogRouter);


const startServer = async () => {
  try {
    // connect to database...
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log("Server started on port https://medi-server.onrender.com")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
