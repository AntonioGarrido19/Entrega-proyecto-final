import {findAll, create, findById} from "../services/messages.service.js"

export const getMessages = async (req,res)=>{
    try {
        const messages = await findAll();
        console.log(messages);
        res.status(200).json({ messages });
      } catch (error) {
        console.error("Error fetching messages:", error); // Log the error
        res.status(500).json({ error });
      }
}

export const createMessage = async (req,res)=>{
    const { message, user } = req.body;
    if (!user || !message) {
      return res.status(200).json({ message: "Some data is missing" });
    }
    try {
      const newMessage = await create(req.body);
      res.status(200).json({ message: "message created", message: newMessage });
    } catch (error) {
      res.status(500).json({ error });
    }
}

export const getMessageById = async (req,res)=>{
    const { id } = req.params;
    try {
      const message = await findById(id);
      if (!product) {
        res.status(400).json({ message: "Invalid message ID" });
      } else {
        res.status(200).json({ message: "message found", message });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
}

