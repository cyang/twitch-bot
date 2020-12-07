const tmi = require('tmi.js');
const say = require('say');

// Define configuration options
const opts = {
  identity: {
    username: <BOT_USERNAME>,
    password: <OAUTH_TOKEN>
  },
  channels: [
    <CHANNEL_NAME>
  ]
};


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Variables
deathCount = 0

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  if (msg.length === 0) { return; }

  // Replace multiple whitespaces, tabs, newlines with single white space
  msg = msg.replace(/\s\s+/g, ' ');
  
  const commandName = msg.split(' ')[0]

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!deaths') {
    if (deathCount == 1) {
      client.say(target, `Died ${deathCount} time`);
    } else {
      client.say(target, `Died ${deathCount} times`);
    }
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!deathadd') {
    deathCount += 1
    client.say(target, `Incremented the death count`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!tts') {
    say.speak(context.username + " says " + msg.substr(msg.indexOf(' ') + 1));
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  } 
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
