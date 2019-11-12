import * as Soc from './socket/socket';
import * as types from '../types/user-action-types';

export const connect_to_soc = () => ({
    type: types.CONNECT_TO_SOCKET,
    socket : Soc.connect_to_socket()
})