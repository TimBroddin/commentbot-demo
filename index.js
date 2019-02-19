const fs = require("fs");
const CommentBot = require("facebook-commentbot");
const fbtokenmagic = require("fbtokenmagic");

const lines = [
  "Avontuur met Anja, iets voor jou? 😉",
  "BAM, cultuur met grote C! Zin in? 😁",
  "Klaar voor (après-)ski? 😁"
];

const setup = async function() {
  // hieronder komt de access token
  const tokenmagic = await fbtokenmagic();
  const bot = new CommentBot({
    accessToken: tokenmagic.access_token
  });

  bot.pageId = tokenmagic.pageId;
  bot.postId = "2096239813731705";

  bot.onComment = async ({ from, message }) => {
    console.log(`Comment: ${from ? from.name : ""}: ${message}`);
    const r = Math.floor(Math.random() * lines.length);
    console.log("Posting");
    return {
      text: lines[r],
      image: fs.createReadStream(`./images/${r}.jpg`)
    };
  };

  bot.go();
};

setup();
