export const interactionId = "confirm-close-ticket-btn";

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
  const ticketChannel = interaction.channel;
  const collection = interaction.client.db.collection("tickets");

  await collection.deleteOne({ channelId: ticketChannel.id });
  await ticketChannel.delete();
}
