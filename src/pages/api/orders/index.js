import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case "POST":
      try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json({ message: "Something went wrong!" });
      break;
  }
};

export default handler;
