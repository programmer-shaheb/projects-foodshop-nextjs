import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      if (!token || token !== process.env.TOKEN) {
        return res.status(401).json("Not Authenticated!");
      }
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json({ message: "Something went wrong!" });
      break;
  }
}
