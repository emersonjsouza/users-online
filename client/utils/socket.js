const io = require('socket.io-client');

export default () => {
  const socket = io.connect('http://localhost:3000');
  const constants = {
    ADD_USER_LOGGED: 'ADD_USER_LOGGED',
    IS_USER_ONLINE: 'IS_USER_ONLINE'
  }

  const addUserLogged = (data) => {
    socket.emit(constants.ADD_USER_LOGGED, data);
  }

  const isUserLogged = (name) => {
    socket.emit(constants.IS_USER_ONLINE, {name});
  }

  const listenUserLogged = (name, cb) => {
    const key = constants.IS_USER_ONLINE+'-'+name;
    socket.on(key, cb);
  }

  const unlistenUserLogged = (name) => {
    const key = constants.IS_USER_ONLINE+'-'+name;
    socket.off(key);
  }

  return {
    listenUserLogged,
    unlistenUserLogged,
    addUserLogged,
    isUserLogged
  }
}
