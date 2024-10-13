import {DataSource} from 'typeorm'
import { Ticket } from './entities/Ticket.js';
import { Support } from './entities/Support.js';

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./main.sqlite",
    synchronize: true,
    logging: true,
    entities: [Ticket, Support],
    subscribers: [],
    migrations: [],
})
AppDataSource.initialize()
    .then(() => {
      console.log("db initialized")
    })
    .catch((error) => console.log(error))