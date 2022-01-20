import Order from "../../../models/Order";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, body, { new: true });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Order Deleted Successfully!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default handler;
