import React, { Component } from 'react';
import  Terminal  from 'react-console-emulator'
import './WTHTerminal.css';

export interface IWTHTerminalalProps {

}

class WTHTerminal extends Component {
  private static instance: WTHTerminal;
  private terminal: React.RefObject<Terminal>;

  welcomeMessage = 
  (<pre>
    Welcome to ICUNIX terminal                      <br/>
    Type "help" to see a list of commands         <br/>
    ██╗  ██████╗ ██╗   ██╗ ███╗   ██╗ ██╗ ██╗  ██╗  <br/>
    ██║ ██╔════╝ ██║   ██║ ████╗  ██║ ██║ ╚██╗██╔╝  <br/>
    ██║ ██║      ██║   ██║ ██╔██╗ ██║ ██║  ╚███╔╝   <br/>
    ██║ ██║      ██║   ██║ ██║╚██╗██║ ██║  ██╔██╗   <br/>
    ██║ ╚██████╗ ╚██████╔╝ ██║ ╚████║ ██║ ██╔╝ ██╗  <br/>
    ╚═╝  ╚═════╝  ╚═════╝  ╚═╝  ╚═══╝ ╚═╝ ╚═╝  ╚═╝
  </pre>);



  commands = {
    login: {
      description: "login to the system",
      usage: "login",
      fn: () => {
        return this.login();
      }
    },
    register: {
      description: "register to the system",
      usage: "register",
      fn: () => {
        return this.register();
      }
    }
  };

  private constructor(props: IWTHTerminalalProps) {
    super(props);
    if(this.terminal === undefined){
      this.terminal = React.createRef();
    }
  }

  public static getInstance(props: IWTHTerminalalProps=null) {
    if (!WTHTerminal.instance) {
      WTHTerminal.instance = new WTHTerminal(props);
    }
    return WTHTerminal.instance;
  }

  runCommand(str: string){
    this.terminal.current.terminalInput.current.value = str;
    this.terminal.current.processCommand();
  }

  login() {
    // read username, password
    // send to server
    //
    // this.terminal.current.terminalInput.current.value = "login() called";
    return "login() called";
  }

  register() {
    // read student id, username, password, email
    // send to server
    //

    // this.terminal.current.terminalInput.current.value = "register() called";
    return "register() called";
  }

  render(): React.ReactNode {
    return (
      <Terminal id="wthterminal"
        ref={this.terminal}
        style={{maxHeight:"1000px"}}
        commands={this.commands}
        promptLabel="> "
        welcomeMessage={this.welcomeMessage}
      />
    );
  }
}

export default WTHTerminal;
