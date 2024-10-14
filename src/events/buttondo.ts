import {ButtonInteraction, ChannelType, Events } from "discord.js";
import { AppDataSource } from "../typeorm/data-sorce.js";
import { Ticket } from "../typeorm/entities/Ticket.js";
import { closeEmbed, closeRow, confirmBut, confirmEmbed, confirmRow } from "../utils/embeds.js";
import { ButtonComponent, Discord, On } from "discordx";
import { closeTicket, isTicket, isTicketOwner } from "../utils/utils.js";


@Discord()
export class neExample {
  @ButtonComponent({ id: "open" })
  async handler(interaction: ButtonInteraction): Promise<void> {
    let ticket = new Ticket()
    ticket.ownerid = interaction.user.id
    ticket.channelid = ""
    try{
      await AppDataSource.manager.save(ticket)
      interaction.guild?.channels.create({                                                                  
        name: "ticket-" + ticket.id.toString(),
        type: ChannelType.GuildText,              
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
          },
          {
            deny: ['ViewChannel', 'SendMessages'],
            id: interaction.guildId!
          }
        ] 
        
        
      }).then(async result => {
        //let support = await AppDataSource.getRepository(Support).findOneBy({ serverid: interaction.guild?.id })
        //let supportRoles =  JSON.parse(support!.rolesid)
        //supportRoles.roles.forEach((element: string) => {
          //result.permissionOverwrites.edit("" , {ViewChannel: true, SendMessages: true})
        //});
        result.send({ embeds: [closeEmbed], components: [closeRow as any] })
        ticket.channelid = result.id
        await AppDataSource.manager.save(ticket)
        interaction.reply({content: `<#${result.id}>`, ephemeral: true})
      })
    }catch(err){
      console.log(err)
      interaction.reply({content: "Eror creating a ticket message to developer"})
    }
  }
  @ButtonComponent({ id: "close" })
  async nohandler(interaction: ButtonInteraction): Promise<void> {
    if(await isTicket(interaction.channel?.id) == true) {
      if(await isTicketOwner(interaction.user.id, interaction.channel?.id) == true || true == true) {
        interaction.reply({ embeds: [confirmEmbed], components: [confirmRow as any] })
      }
    } else {
      interaction.reply({content: "its not a ticket", ephemeral: true})
    }
  }
  @ButtonComponent({ id: "confirm" })
  async totnohandler(interaction: ButtonInteraction): Promise<void> {
    if(await isTicket(interaction.channel?.id) == true) {
      if(await isTicketOwner(interaction.user.id, interaction.channel?.id) == true || true == true) {
        interaction.channel?.delete()
      }
    } else {
      interaction.reply({content: "its not a ticket", ephemeral: true})
    }
  }
}