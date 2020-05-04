require('dotenv').config();

const app = require('express')()
  , http = require('http').createServer(app)
  , io = require('socket.io')(http)
  
let $userConnected = {};

const constants = {
  ADD_USER_LOGGED: 'ADD_USER_LOGGED',
  IS_USER_ONLINE: 'IS_USER_ONLINE',
}

io.on('connect', async (client) => {
  console.log("[+] New Connection :", client.id)

  //that is used to log-in new user session
  client.on(constants.ADD_USER_LOGGED, ({name}) => {
    const key = constants.IS_USER_ONLINE + '-' + name;

    if(!Object.keys($userConnected).includes(client.id)) {
      let data = {name, isOnline: true};
      
      $userConnected[client.id] = data;

      //notify user listing about this profile
      io.emit(key, data);
    }
  });

  //it's used for know what user is logged
  client.on(constants.IS_USER_ONLINE, ({name}) => {
    const key = constants.IS_USER_ONLINE + '-' + name;
    let user = Object.values($userConnected).find(x => x.name == name);
    if(user) {

      //notify me what users is logged
      client.emit(key, user);
    }
  });

  client.on('disconnect', () => {
    let user = $userConnected[client.id];
    
    if(Object.keys($userConnected).includes(client.id)) {
      const key = constants.IS_USER_ONLINE + '-' + user.name;
      
      user.isOnline = false;

      //notify user listing about this profile
      io.emit(key, user)

      delete $userConnected[client.id];
    }

    client.removeAllListeners(constants.IS_USER_ONLINE);
    client.removeAllListeners(constants.ADD_USER_LOGGED);
    console.log('[-] Disconnected :', client.id)
  });

  client.on('error', (err) => {
    console.log('[x] Error :', client.id)
    console.log(err)
  });
});

http.listen(process.env.SOCKET_PORT, (err) => {
  console.log('Realtime online');
});
