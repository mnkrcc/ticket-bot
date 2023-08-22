import {
    SlashCommandBuilder,
    PermissionFlagsBits,
  } from "discord.js";

  export const data = new SlashCommandBuilder()
    .setName("add-member")
    .setDescription("Add another member to the ticket.")
    .addUserOption((option) =>
        option
            .setName("member")
            .setDescription("The member to add to the ticket.")
            .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

/**
 * Execute the interaction
 * @param {import("discord.js").Interaction<import("discord.js").CacheType>} interaction
 */
export async function execute(interaction) {
    const channel = interaction.channel;
    const user = interaction.options.getUser("member");

    await channel.permissionOverwrites.edit(user, {
        ViewChannel: true,
        SendMessages: true,
    });

    await interaction.reply({
        content: `Added <@${user.id}> to the ticket.`,
    });
}