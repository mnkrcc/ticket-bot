import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

// Export a constant interactionId that will be used to identify this interaction by the API.
export const interactionId = "ticket-modal-btn";

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
  const modal = new ModalBuilder()
    .setCustomId("ticket-modal")
    .setTitle("Create a ticket!");

  const ticketTitleInput = new TextInputBuilder()
    .setCustomId("ticket-title-input")
    .setMaxLength(1024)
    .setLabel("What is your ticket about?")
    .setStyle(TextInputStyle.Short);

  const summaryInput = new TextInputBuilder()
    .setCustomId("summary-input")
    .setMaxLength(1024)
    .setLabel("Explain your ticket in detail.")
    .setStyle(TextInputStyle.Paragraph);

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder().addComponents(ticketTitleInput);
  const secondActionRow = new ActionRowBuilder().addComponents(summaryInput);
  modal.addComponents(firstActionRow, secondActionRow);

  // Show the modal to the user
  await interaction.showModal(modal);
}
