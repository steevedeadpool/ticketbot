import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export const openEmbed = new EmbedBuilder()
	.setColor("#2dd8a1")
	.setTitle("``📥`` Открыть тикет")
	.setDescription("Для открытия тикета нажмите кнопку ниже!")
	.setImage("https://cdn.discordapp.com/attachments/1212214776839675924/1290905540704206888/bb89b77d4fa70691.png?ex=66fe28f8&is=66fcd778&hm=4be28c68e8e77f0b11c93e40aeec96757f3e627bad7cc8d5573d6a1164d4ba67&")
	.setFooter({ text: "Star SMP", iconURL: "https://media.discordapp.net/attachments/1280950165057830922/1282317257237598219/starsmp-logo.png?ex=66fde5c2&is=66fc9442&hm=8eb4a5c5cdb31d21b4037985a2f79fea8325664c61f44142f84cdf1ee81ef45d&=&format=webp&quality=lossless&width=671&height=671" })

export const openBut = new ButtonBuilder()
	.setCustomId('open')
	.setLabel('Открыть')
	.setEmoji('📥')
	.setStyle(ButtonStyle.Success)

export const openRow = new ActionRowBuilder()
	.addComponents(openBut)

export const closeEmbed = new EmbedBuilder()
    .setColor("#2dd8a1")
    .setTitle("Открыт тикет!")
    .setDescription("Добро пожаловать в тикет! Опишите вашу проблему или вопрос!")
    .setImage('https://cdn.discordapp.com/attachments/1212214776839675924/1290905540704206888/bb89b77d4fa70691.png?ex=66fe28f8&is=66fcd778&hm=4be28c68e8e77f0b11c93e40aeec96757f3e627bad7cc8d5573d6a1164d4ba67&');

export const closeBut = new ButtonBuilder()
    .setCustomId('close')
    .setLabel('Закрыть')
    .setEmoji('📤')
    .setStyle(ButtonStyle.Danger)

export const closeRow = new ActionRowBuilder()
    .addComponents(closeBut)

export const confirmEmbed = new EmbedBuilder()
    .setTitle("``⚠️`` Подтвердите закрытие тикета")
    .setDescription("Подтвердите закрытие тикета или отмените его закрытие с помощью кнопок ниже!")
    .setColor("#2dd8a1");

export const confirmBut = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('Подтвердить')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Success)

export const confirmRow = new ActionRowBuilder()
    .addComponents(confirmBut)