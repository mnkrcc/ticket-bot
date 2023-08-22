import {
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";

export const interactionId = "ticket-modal";

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
  const title = interaction.fields.getTextInputValue("ticket-title-input");
  const summary = interaction.fields.getTextInputValue("summary-input");
  const collection = interaction.client.db.collection("tickets");
  const res = await collection.find({ userId: interaction.user.id }).toArray();

  let channelName = `ticket-${interaction.user.username}`;

  if (res && res.length > 0) {
    channelName = `${channelName}-${res.length + 1}`;
  }

  const ticketChannel = await interaction.guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    parent: process.env.TICKETS_CATEGORY_ID,
    permissionOverwrites: [
      {
        id: interaction.user.id,
        deny: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
        ],
      },
      {
        id: interaction.guild.roles.everyone.id,
        deny: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
        ],
      },
    ],
  });

  await collection.insertOne({
    userId: interaction.user.id,
    channelId: ticketChannel.id,
  });

  const ticketEmbed = new EmbedBuilder()
    .setTitle("Support Ticket")
    .setAuthor({
      iconURL:
        "https://media.discordapp.net/attachments/1141826944875384923/1142570566549786734/logo-discord-bot-webhook.png",
      name: "Moniker Support",
      url: "https://mnkr.cc/",
    })
    .setDescription("Please wait until the team responds to your ticket.")
    .addFields(
      {
        name: "What's is your ticket about?",
        value: title,
        inline: false,
      },
      {
        name: "Explain your ticket in detail.",
        value: summary,
        inline: false,
      },
    )
    .setColor("#282b30")
    .setTimestamp();

  const closeTicketBtn = new ButtonBuilder()
    .setCustomId("close-ticket-btn")
    .setLabel("Close Ticket")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(closeTicketBtn);

  await ticketChannel.send({
    content: `<@${interaction.user.id}> <@&${process.env.TEAM_ROLE_ID}>`,
    embeds: [ticketEmbed],
    components: [row],
  });

  await interaction.reply({
    content: `Created your ticket in <#${ticketChannel.id}>!`,
    ephemeral: true,
  });
}
