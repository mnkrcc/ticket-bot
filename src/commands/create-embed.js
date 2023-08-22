import {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("create-embed")
  .setNameLocalizations({
    de: "embed-erstellen",
  })
  .setDescription("Create the embed for users to create a ticket with.")
  .setDescriptionLocalizations({
    de: "Erstelle das Embed, mit dem Nutzer ein Ticket erstellen können.",
  })
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
  const ticketModalBtn = new ButtonBuilder()
    .setCustomId("ticket-modal-btn")
    .setLabel("📩")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(ticketModalBtn);

  const embed = new EmbedBuilder()
    .setTitle("🎫 Need Personal Support?")
    .setAuthor({
      iconURL:
        "https://media.discordapp.net/attachments/1141826944875384923/1142570566549786734/logo-discord-bot-webhook.png",
      name: "Moniker Support",
      url: "https://mnkr.cc/",
    })
    .setDescription(
      "If you have a specific question or need personalized assistance, please open a support ticket by reacting to the 📩 emoji below. Our team will be glad to help you privately.",
    )
    .setColor("#282b30")
    .setFooter({
      text: "Endless Sharing within a single platform.",
      iconURL:
        "https://media.discordapp.net/attachments/1141826944875384923/1142570566549786734/logo-discord-bot-webhook.png",
    });

  await interaction.channel.send({ embeds: [embed], components: [row] });

  await interaction.reply({ content: "Embed created!", ephemeral: true });
}
