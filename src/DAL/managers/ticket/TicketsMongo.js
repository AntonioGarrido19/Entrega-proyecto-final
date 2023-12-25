import { ticketsModel } from "../../mongoDB/models/tickets-model.js";

class TicketsMongo {

    async createOne(obj) {
        try {
          const newTicket = await ticketsModel.create(obj);
          return newTicket;
        } catch (error) {
          return error;
        }
      }
    }

    export const ticketsMongo = new TicketsMongo();
