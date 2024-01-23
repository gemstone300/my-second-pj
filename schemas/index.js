//서버-MongoDB 연결
import mongoose from "mongoose";

const connect = () => {
  //MongoDB 서버와 연결

  mongoose
    .connect(
      //mongoDB ID, PW, 주소
      "mongodb+srv://gemstone300:okcashbag1@express-mongo.guu8ooq.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "node_lv1",
      },
    )
    .then(() => console.log("MongoDB-product 데이터베이스 연결 성공"))
    .catch((err) => console.log(`MongoDB 연결 실패했습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
