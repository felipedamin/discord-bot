const { Client, MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const Campeonato = require('./campeonato');
const campeonatoNovo = new Campeonato()

const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  let contentArray = msg.content.split(" ");
  console.log(contentArray)
  if (contentArray.includes('ping')) {
    msg.channel.send(`${msg.author}, pong`);
  }
  else if (contentArray.includes('quem') && contentArray.includes('eu') && contentArray.includes('sou')) {
    msg.channel.send(msg.author.username)
  }
  else if (contentArray.includes('-server')) {
    // chama endpoint do server
    try {
      const response = await axios.get('http://localhost:3000/discordbot/');
      msg.channel.send(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }
  else if (contentArray.includes('embed')) {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xff0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
  }
  else if (contentArray.includes('entrar') && contentArray.includes('-campeonato')) {
    campeonatoNovo.addParticipante(msg.author);
    msg.channel.send(`${msg.author} entrou no campeonato`);
  }
  else if (contentArray.includes('sorteia') && contentArray.includes('-campeonato')) {
    let sorteio = campeonatoNovo.sorteiaChaves();
    console.log(sorteio);
    msg.channel.send(sorteio);
  }
});

client.login('ODI1ODA5NjI2ODIwNzcxODYw.YGDVJQ.0dCrAHlHwuKWgSuG0Rch5h1XZHk');
