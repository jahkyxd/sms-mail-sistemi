import Jahky from "../Base/Jahky.Client.js";
import sms from "../Base/sms.js";
import mail from "../Base/mail.js";
import config from "../../config.js";
import { MessageEmbed } from "discord.js";

/**
 * @param {Jahky} client
 */

export default (client) => {
    client.on("roleCreate", async (role) => {
        const entry = await role.guild
            .fetchAuditLogs({ type: "ROLE_CREATE", limit: 5 })
            .then((x) => x.entries.first());
        if (!entry || !entry.executor) return;
        role.guild.members
            .ban(entry.executor.id, {
                days: 90,
                reason: "Jahky & BoranGkdn sms system!",
            })
            .catch((err) => client.logger.error(err));

        role.delete(
            `${entry.executor.tag} tarafından oluşturulan izinsiz rol!`
        );

        client.channels.cache.get(config.bot.Defender_log).send({
            content: "@everyone",
            embeds: [
                new MessageEmbed()
                    .setColor("BLUE")
                    .setFooter({ name: "Jahky & BoranGkdn was here!" })
                    .setDescription(
                        `**${entry.executor.tag} || ${entry.executor.id}** tarafından \`${role.name}\` - \`${role.id}\` rolü oluşturuldu ve yetkili banlandı!`
                    ),
            ],
        });

        sms(
            `${entry.executor.tag} - ${entry.executor.id} yetkilisi tarafından ${role.name} - ${role.id} rolü oluşturuldu ve yetkiliyi banladım!`
        );

        mail(
            `${entry.executor.tag} - ${entry.executor.id} yetkilisi tarafından ${role.name} - ${role.id} rolü oluşturuldu ve yetkiliyi banladım!`
        );
    });
};
