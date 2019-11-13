import * as types from '../types/user-action-types';
import * as soctypes from './socket/socket-event-types';

export const connect_to_soc = (socket) => ({
    type: types.CONNECT_TO_SOCKET,
    socket
})

export const loading_this = (id) => ({
    type: types.LOADING_THIS,
    id
})

export const loaded_this = (update) => ({
    type: types.loaded_this,
    update
})

export const query_search = (soc, query) => (dispatch) => {
    console.log(soc);
    
    soc.emit(soctypes.QUERY_SEARCH, query, (data) => {
        console.log(data);
        
    })    
}