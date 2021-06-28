const chalk = require("chalk");
const mongo = require("../../db/mongo");
const quranToggleSchema = require("../../db/schema/quranToggle");

module.exports = {
  name: "set-quran-toggle",
  cooldown: 5,
  aliases: [],

  run: async function(client, message) {
    const connectToMongoDB = async () => {
      await mongo().then(async mongosse => {
        try {
          let data;
          data = await quranToggleSchema.findOne({
            guildID: message.guild.id
          });
          if (!data || data == null) {
            const newData = {
              guildID: message.guild.id,
              status: "on"
            };
            await new quranToggleSchema(newData).save();
          }
          try {
          setTimeout(async function() {
            var status = data.toJSON().status;
            if (status == "off") {
              await quranToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "on"
                }
              );
              message.channel.send(
                "**:white_check_mark: | The holy Quran has been activated.**"
              );
            }
            if (status == "on") {
              await quranToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "off"
                }
              );
              message.channel.send(
                "**:white_check_mark: | The spread of the Holy Quran has been stopped.**"
              );
            }
          }, 500);
          } catch (err) {
            message.channel.send("**:x: | Please try again in seconds.**")
          }
        } finally {
          mongosse.connection.close();
        }
      });
    };
    connectToMongoDB();
  }
};
