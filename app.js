import express from "express";
import productRouter from "./routes/products.router.js";
import connect from "./schemas/index.js";

const app = express();
const PORT = 4000;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello Thie is Product-CRUD page" });
});

app.use("/api", [productRouter]);
app.use("/", [router]);

app.listen(PORT, () => {
  console.log(PORT, "4000번 포트로 secondPj 서버가 열렸어요");
});
