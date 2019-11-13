import io from "socket.io-client";
// import { SERVER_PORT, SERVER_URL, TOKEN_NAME } from "../../../../consts/app-config";
import { store } from '../../store/config';
import * as actions from '../actions';
import * as SOC_TYPES from './socket-event-types';

const channel = `http://localhost:9001`;

export const connect_to_socket = () => {
    const socket = io.connect(channel, { reconnectionDelay: 1000, reconectionDelayMax: 5000 });

    socket.on("connect", () => {
        //store.dispatch(terminalActions.terminal_started());
        console.log('socket connected...................');
        
    });

    socket.on('disconnect', () => {
        console.log('socket disconnected..............');    
    })

    socket.on(SOC_TYPES.LOADED_THIS, (data) => {
        if(data.status) store.dispatch(actions.loaded_this(data.value))
    })

    socket.on(SOC_TYPES.LOADING_THIS, (data) => {
        console.log('listen..........form server for other', data);
        if(data.status) store.dispatch(actions.loading_this(data.value));
    })
    
    return socket;
}

export const disconnect = (socket) => {
    socket.close();
}

