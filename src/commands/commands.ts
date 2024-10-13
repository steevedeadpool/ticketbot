import 'reflect-metadata'
import { ApplicationCommandOptionType, CommandInteraction, Client, Message, User, Guild as gld, ChannelType, GuildMember, Role, BaseGuildTextChannel,} from "discord.js";
import type { SimpleCommandMessage } from "discordx";
import {
  Guild,
  Discord,
  SimpleCommand,
  Slash,
  SlashOption,
} from "discordx";
import { Ticket } from '../typeorm/entities/Ticket.js';
import { AppDataSource } from "../typeorm/data-sorce.js";
import { addSupport, addSupportRow, closeTicket, isTicket, isTicketOwner } from '../utils/utils.js';
import { Support } from '../typeorm/entities/Support.js';
import { permission } from 'process';

@Discord()
export class Example {
  @SimpleCommand({ aliases: ["hi"] })
  async hello(command: SimpleCommandMessage): Promise<void> {
    const member = command.message.member;
    if (member) {
      await command.message.reply(`👋 ${member.toString()}`);
    } else {
      await command.message.reply("👋 hello");
    }
  }

  @Guild("1090552478606569524")
  @Slash({ description: "create-ticket", name: "create-ticket" })
  async create_ticket( interaction: CommandInteraction) {
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
        let support = await AppDataSource.getRepository(Support).findOneBy({ serverid: interaction.guild?.id })
        let supportRoles =  JSON.parse(support!.rolesid)
        //supportRoles.roles.forEach((element: string) => {
          //result.permissionOverwrites.edit("" , {ViewChannel: true, SendMessages: true})
        //});
        ticket.channelid = result.id
        await AppDataSource.manager.save(ticket)
        interaction.reply({content: `<#${result.id}>`, ephemeral: true})
      })
    }catch(err){
      console.log(err)
      interaction.reply({content: "Eror creating a ticket message to developer"})
    }
  }

  @Guild("1090552478606569524")
  @Slash({ description: "closes ticket", name: "close-ticket" }) 
  async close_ticket( interaction: CommandInteraction) {
    if(await isTicket(interaction.channel?.id) == true) {
      if(await isTicketOwner(interaction.user.id, interaction.channel?.id) == true || true == true) {
        interaction.channel?.delete()
      }
    } else {
      interaction.reply({content: "its not a ticket", ephemeral: true})
    }
  }


  //Добавляет юзера в тикет
  @Guild("1090552478606569524")
  @Slash({ description: "add user to ticket", name: "add-user" }) 
  async add_user(
    @SlashOption({
    description: "user",
    name: "user",
    required: true,
    type: ApplicationCommandOptionType.User,
  })
  usr: GuildMember | User,
  interaction: CommandInteraction) {
    if(await isTicket(interaction.channel?.id) == true) {
      if(await isTicketOwner(interaction.user.id, interaction.channel?.id) == true) {
        if(interaction.channel?.type == 0) {
          interaction.channel.permissionOverwrites.edit(usr, {ViewChannel: true, SendMessages: true})
          interaction.reply({content: `Added ${usr.toString} to ticket`})
        } else {
          interaction.reply({content: "you are not ticket owner", ephemeral: true})
        }
      }
    } else {
      interaction.reply({content: "its not a ticket", ephemeral: true})
    }
  }



  //Убирает юзера из тикета
  @Guild("1090552478606569524")
  @Slash({ description: "removes user from ticket", name: "remove" }) 
  async remove_user(
    @SlashOption({
    description: "user",
    name: "user",
    required: true,
    type: ApplicationCommandOptionType.User,
  })
  usr: GuildMember | User,
  interaction: CommandInteraction) {
    if(await isTicket(interaction.channel?.id) == true) {
      if(await isTicketOwner(interaction.user.id, interaction.channel?.id) == true) {
        if(interaction.channel?.type == 0) {
          interaction.channel.permissionOverwrites.edit(usr, {ViewChannel: false, SendMessages: false})
          interaction.reply({content: `Removed <@${usr.id}> from ticket`})
        } else {
          interaction.reply({content: "you are not ticket owner", ephemeral: true})
        }
      }
    } else {
      interaction.reply({content: "its not a ticket", ephemeral: true})
    }
  }



  @Guild("1090552478606569524")
  @Slash({ description: "add support role or ticket", name: "add-support" }) 
  add_support(
    @SlashOption({
      description: "support role or user",
      name: "support",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    })
    sprt: GuildMember | User | Role,
     interaction: CommandInteraction) {
      console.log(sprt.id)
      addSupport(sprt.id, interaction.guild!.id)
      interaction.reply("a")
  }
  
  @Guild("1090552478606569524")
  @Slash({ description: "TEMP COMMAND", name: "temp_command" })
  temp_command(interaction: CommandInteraction) {
    addSupportRow(interaction.guild!.id)
  } 
  
  @Guild("1090552478606569524")
  @Slash({ description: "test", name: "test" })
  test(interaction: CommandInteraction) {
    console.log(interaction.channel?.type)
  } 

}
