const { MessageEmbed } = require("discord.js");
const quickdb = require("quick.db");

module.exports = {
  name: "help",
  cooldown: 2,
  run: async (client, message) => {
    var prefix = quickdb.fetch(`Prefix_${message.guild.id}`);
    if (prefix == null)
      quickdb.set(
        `Prefix_${message.guild.id}`,
        require("../../config/bot").prefix
      );
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "help menu 🕌",
          ""
        )
        .setThumbnail(client.user.avatarURL({ dynaimc: true }))
        .setColor(0x2f3136)
        .setFooter(
          client.user.username,
          client.user.avatarURL({ dynaimc: true })
        ).setDescription(`
**Info**
> 🕌 \`${prefix}help\` **To get the sky.**
> 🕌 \`${prefix}ping\` **To get a result with ping bot.**

**Zkr**
> 🕌 \`${prefix}set-azkar-channel\` **To determine the rum spreading the thoughts.**
> 🕌 \`${prefix}set-azkar-embed <on/off>\` **To change between the system of spreading ideas from a normal president to a person.**
> 🕌 \`${prefix}set-azkar-toggle <on/off>\` **To stop and operate the transmission system.**
> 🕌 \`${prefix}morning\` **To get morning remembrances.**
> 🕌 \`${prefix}evening\` **To get the remembrance of haven.**
> 🕌 \`${prefix}mos7f\` **For the pages of the Holy Quran.**

**Quran radio**
> 🕌 \`${prefix}set-quran-channel\` **To determine the rum of the Quran Radio**
> 🕌 \`${prefix}set-quran-toggle\` **To stop and operate the Quran Radio System.**
> 🕌 \`${prefix}quran\` **To run certain images in the Quran.**

**Bot prefix server**: \`${prefix}\`

`)

      // .addFields(
      //   { name: `> ${prefix}help`, value: "**`للحصول على قاءمة السماعده`**", inline: false },
      //   { name: `> ${prefix}support`, value: "**`للحصول على روابط مساعدة البوت`**", inline: false },
      //   { name: `> ${prefix}ping`, value: "**`للحصول على نتيجه ببينج البوت`**", inline: false },
      //   { name: `_ _`, value: "_ _", inline: false },
      //   { name: `> ${prefix}set-azkar-channel`, value: "**`لتحديد روم نشر الأذكار`**", inline: false },
      //   { name: `> ${prefix}set-azkar-embed`, value: "**`للتغير ما بين نظام نشر الأذكار من رساءل عاديه ل رساءل ايمبد`**", inline: false },
      //   { name: `> ${prefix}set-azkar-toggle`, value: "**`لايقاف و تشغيل نظام أرسال الأذكار`**", inline: false },
      //   { name: `> ${prefix}morning`, value: "**`للحصول على اذكار الصباح`**", inline: false },
      //   { name: `> ${prefix}evening`, value: "**`للحصول على اذكار المساء`**", inline: false },
      //   { name: `> ${prefix}mos7f`, value: "**`للحصول على صفحات المصحف الكريم`**", inline: false },
      //   { name: `_ _`, value: "_ _", inline: false },
      //   { name: `> ${prefix}set-quran-channel`, value: "**`لتحديد روم اذاعة القرءان الكريم`**", inline: false },
      //   { name: `> ${prefix}set-quran-toggle`, value: "**`لاقاف و تشغيل نظام أذاعة القرءان الكريم`**", inline: false },
      //   { name: `> ${prefix}quran`, value: "**`لتشغيل صور معينه في القرءان الكريم`**", inline: false },
      // )
    );
  }
};
