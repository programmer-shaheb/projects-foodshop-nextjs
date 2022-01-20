import Product from "../../../models/Product";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const pizza = await Product.findById(id);
      res.status(200).json(pizza);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
