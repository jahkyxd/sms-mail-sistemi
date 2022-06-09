import Jahky from "../Base/Jahky.Client.js";
import sms from "../Base/sms.js";
import mail from "../Base/mail.js";
import config from "../../config.js";
import { MessageEmbed } from "discord.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("roleUpdate", async (oldRole, newRole) => {
        const entry = await newRole.guild
            .fetchAuditLogs({ type: "ROLE_UPDATE", limit: 5 })
            .then((x) => x.entries.first());
        if (!entry || !entry.executor.id) return;
        newRole.guild.members
            .ban(entry.executor.id, {
                days: 90,
                reason: "Jahky & BoranGkdn sms system!",
            })
            .catch((err) => client.logger.error(err));

        newRole.edit(
            {
                name: oldRole.name,
                unicodeEmoji: oldRole.unicodeEmoji,
                position: oldRole.position,
                permissions: oldRole.permissions,
                hoist: oldRole.hoist,
                icon: oldRole.icon,
                color: oldRole.color,
                mentionable: oldRole.mentionable,
            },
            "Jahky & BoranGkdn sms system!"
        );

        client.channels.cache.get(config.bot.Defender_log).send({
            content: "@everyone",
            embeds: [
                new MessageEmbed()
                    .setColor("BLUE")
                    .setFooter({ name: "Jahky & BoranGkdn was here!" })
                    .setDescription(
                        `**${entry.executor.tag} || ${entry.executor.id}** tarafından \`${newRole.name}\` - \`${newRole.id}\` rolü güncellendi ve yetkili banlandı!`
                    ),
            ],
        });

        sms(
            `${entry.executor.tag} - ${entry.executor.id} yetkilisi tarafından ${newRole.name} - ${newRole.id} rolü güncellendi ve yetkiliyi banladım!`
        );

        mail(
            `${entry.executor.tag} - ${entry.executor.id} yetkilisi tarafından ${role.name} - ${role.id} rolü güncellendi ve yetkiliyi banladım!`
        );
    });
};
