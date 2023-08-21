import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('create-embed')
	.setNameLocalizations({
		de: 'embed-erstellen',
	})
	.setDescription('Create the embed for users to create a ticket with.')
	.setDescriptionLocalizations({
		de: 'Erstelle das Embed, mit dem Nutzer ein Ticket erstellen können.',
	})
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
	const ticketModalBtn = new ButtonBuilder()
		.setCustomId('ticket-modal-btn')
		.setLabel('Create Ticket')
		.setStyle(ButtonStyle.Primary);

	const row = new ActionRowBuilder()
		.addComponents(ticketModalBtn);

	await interaction.reply({ content: 'Embed', components: [row] });
}