// const { walloftext } = require("../models");

// async function createMessage(req, res) {
//   const { messages } = req.body;
//   try {
//     if (!messages) {
//       return res.status(400).send("Message not found");
//     }
//     // Create the message directly without associating it with a user
//     await walloftext.create({
//       messages,
//     });
//     res.status(201).send("Success!");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating message");
//   }
// }

// async function retrieveMessage(req, res) {
//   try {
//     // Retrieve all messages without filtering by user
//     const allMessages = await walloftext.findAll();
//     let result = allMessages.map((m) => ({
//       messages: m.messages,
//       createdAt: m.createdAt,
//     }));
//     res.json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error retrieving messages");
//   }
// }

// module.exports = {
//   createMessage,
//   retrieveMessage,
// };
