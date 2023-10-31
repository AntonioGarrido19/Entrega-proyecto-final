import { ticketsMongo } from "../DAL/managers/ticket/TicketsMongo.js";

class TicketsService {

    async create(obj) {
        const { code, purchase_datetime, amount, purchaser } = req.params
        if(!code || !purchase_datetime || !amount || purchaser) {
          return res.status(200).json({ message: "Some data is missing" });
        }
        try {        
          const newTicket = await ticketsMongo.createOne(obj);
          res.status(200).json({ message: "Ticket created", ticket: newTicket });
          //return newTicket;
        } catch (error) {
          res.status(500).json({ error });
        }

      }

    }

    export const ticketsService = new TicketsService();
