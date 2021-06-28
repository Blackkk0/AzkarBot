const chalk = require("chalk");
const mongo = require("../../db/mongo");
const azkarToggleSchema = require("../../db/schema/azkarToggle");

module.exports = {
  name: "set-azkar-toggle",
  cooldown: 5,
  aliases: [],

  run: async function(client, message) {
    const connectToMongoDB = async () => {
      await mongo().then(async mongosse => {
        try {
          let data;
          data = await azkarToggleSchema.findOne({
            guildID: message.guild.id
          });
          if (!data || data == null) {
            const newData = {
              guildID: message.guild.id,
              status: "on"
            };
            await new azkarToggleSchema(newData).save();
          }
          setTimeout(async function() {
            var status = data.toJSON().status;
            if (status == "off") {
              await azkarToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "on"
                }
              );
              message.channel.send(
                "**:white_check_mark: | The message has been activated.**"
              );
            }
            if (status == "on") {
              await azkarToggleSchema.updateOne(
                {
                  status: data.toJSON().status
                },
                {
                  status: "off"
                }
              );
              message.channel.send(
                "**:white_check_mark: | The azkar transmission has been suspended.**"
              );
            }
          }, 500);
        } finally {
          mongosse.connection.close();
        }
      });
    };
    connectToMongoDB();
  }
};
