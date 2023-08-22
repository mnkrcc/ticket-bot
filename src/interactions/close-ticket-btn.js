import {
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
} from "discord.js";

export const interactionId = "close-ticket-btn";

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
  const confirmBtn = new ButtonBuilder()
    .setCustomId("confirm-close-ticket-btn")
    .setLabel("Confirm")
    .setStyle(ButtonStyle.Success);

  const cancelBtn = new ButtonBuilder()
    .setCustomId("cancel-close-ticket-btn")
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(confirmBtn, cancelBtn);

  const embed = new EmbedBuilder()
    .setTitle("Close Ticket")
    .setDescription("Are you sure you want to close this ticket?")
    .setColor("#282b30")
    .setTimestamp();

  await interaction.reply({
    content: "Close this ticket?",
    components: [row],
    embeds: [embed],
  });
}
