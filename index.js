const fs = require("fs");
const CommentBot = require("facebook-commentbot");

const lines = [
  "Avontuur met Anja, iets voor jou? 😉",
  "BAM, cultuur met grote C! Zin in? 😁",
  "Klaar voor (après-)ski? 😁"
];

const setup = async function() {
  // hieronder komt de access token
  const bot = new CommentBot({
    accessToken: "PAGE ACCESS TOKEN"
  });

  bot.pageId = "PAGE ID";
  bot.postId = "POST ID";

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
