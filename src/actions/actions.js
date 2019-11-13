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

export const query_update = (query) => ({
    type: types.UPDATE_QUERY,
    query
})

export const loaded_this = (update) => ({
    type: types.LOADED_THIS,
    update
})

export const put_loader = () => ({
    type: types.PUT_LOADER,
})

export const query_search = (soc, query) => (dispatch) => {
    dispatch(put_loader());    
    soc.emit(soctypes.QUERY_SEARCH, query, (data) => {
        dispatch({type: types.QUERY_SEARCH, posts: data.data, related: data.related})
    })    
}