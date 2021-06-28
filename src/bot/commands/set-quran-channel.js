const chalk = require("chalk");
const mongo = require("../../db/mongo");
const azkarVoicesSchema = require("../../db/schema/azkarVoices");
const ytdl = require("ytdl-core");

module.exports = {
  name: "set-quran",
  cooldown: 5,
  aliases: ["set-quran-channel", "set-quran-channel"],

  run: async function(client, message) {
    var args = message.content.split(" ");
    var channel =
      client.channels.cache.get(args[1]) ||
      message.guild.channels.cache.find(c => c.name == args[1]);
    if (!channel)
      return message.channel.send(
        "**:x: | Please write down the name or any of the audio room to be broadcast in the Quran**"
      );
    if (channel) {
      const connectToMongoDB = async () => {
        await mongo().then(async mongosse => {
          try {
            let data;
            data = await azkarVoicesSchema.findOne({
              guildID: message.guild.id
            });
            if (data) {
              await azkarVoicesSchema.updateOne(
                {
                  channel: data.toJSON().channel
                },
                {
                  channel: channel.id
                }
              );
            } else {
              const newData = {
                guildID: message.guild.id,
                channel: channel.id
              };
              await new azkarVoicesSchema(newData).save();
            }
          } finally {
            mongosse.connection.close();
          }
        });
      };
      connectToMongoDB();
      if (!client.voice.connections.get(message.guild.id)) {
        let channelData = channel.id;
        let channel2 =
          client.channels.cache.get(channelData) ||
          (await client.channels.fetch(channelData));
        const connect = await channel2.join();
        connect.play(ytdl("https://www.youtube.com/watch?v=IvsBHohJvNY"));
      }
      message.channel.send(
        "**:white_check_mark: | Rom was transferred to the Holy Quran radio station to `" +
          channel.name +
          "`**"
      );
    }
  }
};
