module.exports = async (client) => {
    console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    client.user.setActivity(client.config.discord.activity);
    client.user.setStatus('idle')
        //let statuses = [
       //     `Kewl Music | -help`,
      //      `music for you! | -help`,
     //]
      
     //setInterval(function() {
     //let status = statuses[Math.floor(Math.random() * statuses.length)];
     //client.user.setActivity(status, { type: 'Playing'});
     //}, 60000)

    
};