import express from "express";
import ProductInfo from "../schemas/products.schema.js";

const router = express.Router();

//상품 목록 조회(GET)
router.get("/products", async (req, res, next) => {
  try {
    const productList = await ProductInfo.find()
      .select("_id title author status createdAt")
      //.sort("-createdAt")
      .sort({ createdAt: -1 })
      .exec();
    //const productList = await ProductInfo.find().select("_id title author status createdAt").sort({ createdAt: -1 });
    res.status(200).json({ productList });
    //res.json(productList);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "서버 처리 도중 예기치 못한 오류가 발생했습니다." });
  }
});

//상품 상세 조회(GET)
router.get("/products/:productId", async (req, res, next) => {
  try {
    //const { productId } = req.params;
    //const currentProductId = await ProductInfo.findById(productId).exec();

    // if (!currentProductId) {
    //   return res
    //     .status(404)
    //     .json({ errorMessage: "상품조회에 실패하였습니다" });
    // }
    // return res.status(200).json({
    //   data: currentProductId,
    // });

    const product = await ProductInfo.findById(req.params.productId).select(
      "_id title content author status createdAt",
    );

    if (!product) {
      return res
        .status(404)
        .json({ errorMessage: "상품조회에 실패하였습니다" });
    }

    return res.json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "서버 처리 도중 예기치 못한 오류가 발생했습니다." });
  }
});

//상품 작성(POST)
router.post("/products", async (req, res, next) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const { title, content, author, password } = req.body;

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
    if (!author) {
      return res
        .status(400)
        .json({ errorMessage: "작성자명 데이터가 존재하지 않습니다." });
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
      //status,
    });

    await productInfo.save();

    return res.status(201).json({ message: "판매 상품을 등록하였습니다." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "서버 처리 도중 예기치 못한 오류가 발생했습니다." });
  }
});

//상품 수정(PUT)
router.put("/products/:productId", async (req, res, next) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    const { productId } = req.params;
    const { title, content, password, status } = req.body;

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
    if (!status) {
      return res
        .status(400)
        .json({ errorMessage: "상품 상태 데이터가 존재하지 않습니다." });
    }
    if (!password) {
      return res
        .status(400)
        .json({ errorMessage: "비밀번호 데이터가 존재하지 않습니다." });
    }

    //const currentProductId = await ProductInfo.findById(productId).exec();
    const product = await ProductInfo.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ errorMessage: "상품조회에 실패하였습니다" });
    }

    const currentPassword = product.password;
    if (currentPassword !== password) {
      return res
        .status(401)
        .json({ errorMessage: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    product.title = title;
    product.content = content;
    product.status = status;

    await product.save();
    //return res.status(200).json({ message: "상품 정보를 수정하였습니다." });
    res.json({ message: "상품 정보를 수정하였습니다." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "서버 처리 도중 예기치 못한 오류가 발생했습니다." });
  }
});

//상품 삭제(DELETE)
router.delete("/products/:productId", async (req, res, next) => {
  try {
    if (!req.body || !req.params) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }
    const { productId } = req.params;
    //const productId = req.params.productId;
    const { password } = req.body;

    //const product = await ProductInfo.findById(productId).exec();
    const product = await ProductInfo.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ errorMessage: "상품 조회에 실패하였습니다." });
    }

    const currentPassword = product.password;
    if (currentPassword !== password) {
      return res
        .status(401)
        .json({ errorMessage: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    await ProductInfo.deleteOne({ _id: productId }).exec();

    res.status(200).json({ message: "상품을 삭제하였습니다." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "서버 처리 도중 예기치 못한 오류가 발생했습니다." });
  }
});

export default router;
