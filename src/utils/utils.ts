import { Ticket } from '../typeorm/entities/Ticket.js';
import { AppDataSource } from "../typeorm/data-sorce.js";
import { Support } from '../typeorm/entities/Support.js';
import 'reflect-metadata'
import { TextBasedChannel } from 'discord.js';
import { channel } from 'diagnostics_channel';

export async function isTicket(channelid: string | undefined) {
    if (await AppDataSource.getRepository(Ticket).findOneBy({ channelid: channelid }) != undefined) {
        return true
    } else {
        return false
    }
}

export async function isTicketOwner(userid: string, channelid: string | undefined) {
    if (await AppDataSource.getRepository(Ticket).findOneBy({ ownerid: userid, channelid: channelid}) != undefined) {
        return true
    } else {
        return false
    }
}


export async function closeTicket(channel: TextBasedChannel | undefined) {
    let ticket = await AppDataSource.getRepository(Ticket).findOneBy({ channelid: channel!.id })
}


export async function addSupportRow(serverid: string) {
    let SupportRow = new Support()
    SupportRow.serverid = serverid
    SupportRow.rolesid =JSON.stringify({roles: []})
    AppDataSource.manager.save(SupportRow)
}

export async function addSupport(id: string, serverid: string) {
        let support = await AppDataSource.getRepository(Support).findOneBy({ serverid: serverid }) 
        let roles = JSON.parse(support!.rolesid)
        roles.roles.push(JSON.stringify(id))
        console.log(roles)
        support!.rolesid = JSON.stringify(roles)
        console.log(JSON.stringify(roles))
        await AppDataSource.manager.save(support)
        
}