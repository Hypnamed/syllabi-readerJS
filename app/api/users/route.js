import connectDatabase from "@/config/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await connectDatabase();
      const database = client.db("syllabi-reader");
      const users = database.collection("users");
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ errMsg: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
