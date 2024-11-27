import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import crudRoutes from "./routes/crud.js";
import path from "path";
import cors from 'cors';
const __dirname = path.resolve();

const app = express();
app.use(cors({
 origin: "http://127.0.0.1:5500/",
}
))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/crud", crudRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
