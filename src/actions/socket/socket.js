import io from "socket.io-client";
// import { SERVER_PORT, SERVER_URL, TOKEN_NAME } from "../../../../consts/app-config";
// import { store } from '../../store/config';
// import * as chatActions from './chatbox-actions';
// import * as types from './chat-socket-types';

const NSP = "chat";
const channel = `http://localhost:9001`;
// console.log(channel, 'chat channel...........');


// const chatSocket = io.connect(channel, { query: { token }, reconnectionDelay: 1000, reconectionDelayMax: 5000 });

// let chatSocket = io;

export const connect_to_socket = () => {
    const chatSocket = io.connect(channel, { reconnectionDelay: 1000, reconectionDelayMax: 5000 });

    chatSocket.on("connect", () => {
        //store.dispatch(terminalActions.terminal_started());
        console.log('chat socket connected...................');
        
    });

    chatSocket.on('disconnect', () => {
        console.log('chat socket disconnected..............');    
    })

    // chatSocket.on(types.CHAT_DATA, (data, second) => {
    //     console.log(data, second, 'All Data.......');
    //     if(data.status) store.dispatch(chatActions.add_on_connecections(data.chatData))
        
    // })
    // chatSocket.on(types.CHAT_MSG, (data) => {
    //     console.log('listen..........form server for other', data);
    //     if(data.status) store.dispatch(chatActions.add_one(data.msgObj));
    //     else store.dispatch(pop_toast(data));
    // })
    // return chatSocket;
}

export const disconnect = (chatSocket) => {
    chatSocket.close();
}

// chatSocket.on(types.)

// export default chatSocket;

