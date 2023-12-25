import { ticketsMongo } from "../DAL/managers/ticket/TicketsMongo.js";
import Randomstring from "randomstring";

class TicketService {
  async createTicket(totalAmount, userEmail) {
      const code = Randomstring.generate();
      const purchase_datetime = new Date();
      const ticket = {
        code,
        purchase_datetime,
        amount: totalAmount,
        purchaser: userEmail
      };

      const newTicket = await ticketsMongo.createOne(ticket);
      return newTicket;
    };
  }


export const ticketService = new TicketService();
