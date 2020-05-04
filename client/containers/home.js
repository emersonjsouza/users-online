import React from 'react';
import socket from '../utils/socket'

export default class Home extends React.Component {
  state = {
    isLoading: false,
    name: '',
    socket: socket(),
    users: [{name: 'Emerson', isOnline: false}, {name: 'Angelica', isOnline: false}]
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { users, socket } = this.state;

    users.forEach((item)=> {
      //add listing to know when was logged
      socket.listenUserLogged(item.name,({name, isOnline}) => {
        let index = users.findIndex(x => x.name == name);
        if(index > -1) {
          users[index].isOnline = isOnline;
          this.setState({users: users});
        }
      });
      
      //ask about what user is logged
      socket.isUserLogged(item.name);
    })
  }

  componentWillUnmount() {
    let { users, socket } = this.state;

    users.forEach((item)=> {
      socket.unlistenUserLogged(item.name);
    })
  }

  logInHandle = () => {
    //add new user session
    this.state.socket.addUserLogged({name: this.state.name})
    this.setState({name: ''})
  }

  render() {
    return (
      <div className="login-container">
        <h1>Dados de acesso</h1>
        <div className="form-group">
          <input type="text" value={this.state.name} onChange={(el)=> this.setState({name: el.target.value})} placeholder="informe seu nome" />
          <button type="button" onClick={this.logInHandle}>Logar</button>
        </div>
        <br />
        <h4>Usuários Online</h4>
        <div className="users-container">
            {this.state.users.map(({name, isOnline})=> {
              return (<div key={name}>
                  <span className="status" style={{backgroundColor: (isOnline ? 'green' : 'red')}}></span> {name}
                </div>)
            })}
        </div>
      </div>
    )
  }
}