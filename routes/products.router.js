import express from "express";
import ProductInfo from "../schemas/products.schema.js";

const router = express.Router();

router.get("/products", async (req, res, next) => {
  const productList = await ProductInfo.find().sort("-createdAt").exec();
  res.status(200).json({ productList });
});

router.get("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;

  const currentProductId = await ProductInfo.findById(productId).exec();

  if (!currentProductId) {
    return res.status(404).json({ errorMessage: "상품조회에 실패하였습니다" });
  }

  return res.status(200).json({
    data: currentProductId,
  });
});

router.post("/products", async (req, res, next) => {
  const { title, content, author, password } = req.body;

  if (!req.body) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  if (!title) {
    return res
      .status(400)
      .json({ errorMessage: "상품명 데이터가 존재하지 않습니다." });
  }
  if (!content) {
    return res
      .status(400)
      .json({ errorMessage: "상품 작성 내용 데이터가 존재하지 않습니다." });
  }
  if (!password) {
    return res
      .status(400)
      .json({ errorMessage: "비밀번호 데이터가 존재하지 않습니다." });
  }

  const status = "FOR_SALE";

  const productInfo = new ProductInfo({
    title,
    content,
    author,
    password,
    status,
  });
  await productInfo.save();

  return res.status(201).json({ message: "판매 상품을 등록하였습니다." });
});

router.put("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { title, content, password, status } = req.body;

  if (req.body == null || productId == null) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  const currentProductId = await ProductInfo.findById(productId).exec();
  if (!currentProductId) {
    return res.status(404).json({ errorMessage: "상품조회에 실패하였습니다" });
  }

  const currentPassword = currentProductId.password;
  if (currentPassword != password) {
    return res
      .status(401)
      .json({ errorMessage: "상품을 수정할 권한이 존재하지 않습니다." });
  }

  if (title) {
    currentProductId.title = title;
  }
  if (content) {
    currentProductId.content = content;
  }
  if (status) {
    currentProductId.status = status;
  }
  await currentProductId.save();
  return res.status(200).json({ message: "상품 정보를 수정하였습니다." });
});

router.delete("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { password } = req.body;

  if (req.body == null || productId == null) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  const currentProductId = await ProductInfo.findById(productId).exec();
  if (!currentProductId) {
    return res
      .status(404)
      .json({ errorMessage: "상품 조회에 실패하였습니다." });
  }

  const currentPassword = currentProductId.password;
  if (currentPassword != password) {
    return res
      .status(401)
      .json({ errorMessage: "상품을 수정할 권한이 존재하지 않습니다." });
  }

  await ProductInfo.deleteOne({ _id: productId }).exec();

  res.status(200).json({ message: "상품을 삭제하였습니다." });
});

export default router;
