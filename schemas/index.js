//서버-MongoDB 연결
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db_url = process.env.MONGODB_URI;
const db_name = process.env.MONGODB_DB_NAME;

console.log("db_url : ", db_url);
console.log("db_name : ", db_name);

const connect = () => {
  //MongoDB 서버와 연결

  mongoose
    .connect(
      //mongoDB ID, PW, 주소
      //"mongodb+srv://gemstone300:okcashbag1@express-mongo.guu8ooq.mongodb.net/?retryWrites=true&w=majority",
      db_url,
      {
        //dbName: "node_lv1",
        dbName: db_name,
      },
    )
    .then(() => console.log("MongoDB-product 데이터베이스 연결 성공"))
    .catch((err) => console.log(`MongoDB 연결 실패했습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
