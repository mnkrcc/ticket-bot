import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

// Export a constant interactionId that will be used to identify this interaction by the API.
export const interactionId = 'ticket-modal-btn';

// This is the function that will be called when the interaction is triggered.
export async function execute(interaction) {
	const modal = new ModalBuilder()
		.setCustomId('ticket-modal')
		.setTitle('Create a ticket!');

	const ticketTitleInput = new TextInputBuilder()
		.setCustomId('ticket-title-input')
		.setLabel('What\'s is your ticket about?')
		.setStyle(TextInputStyle.Short);

	const summaryInput = new TextInputBuilder()
		.setCustomId('summary-input')
		.setMaxLength(500)
		.setLabel('Explain your ticket in detail.')
		.setStyle(TextInputStyle.Paragraph);

	// An action row only holds one text input,
	// so you need one action row per text input.
	const firstActionRow = new ActionRowBuilder().addComponents(ticketTitleInput);
	const secondActionRow = new ActionRowBuilder().addComponents(summaryInput);
	modal.addComponents(firstActionRow, secondActionRow);

	// Show the modal to the user
	await interaction.showModal(modal);
}
