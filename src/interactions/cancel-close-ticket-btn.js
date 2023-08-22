export const interactionId = "cancel-close-ticket-btn";

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
  await interaction.message.delete();
}
