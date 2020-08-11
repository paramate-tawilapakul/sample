import socketIOClient from 'socket.io-client'
import { baseEnpoint } from '../api/client'
export default socketIOClient(baseEnpoint)
