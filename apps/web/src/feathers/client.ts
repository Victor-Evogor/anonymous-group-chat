import {Params, feathers} from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import type { SocketService } from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import env from '../../env.json'

export const socket = io(env.feathersServer)
type payloadData = {
  groupId: string
}

type ServiceType = {
  'room-membership': SocketService & {
    join: (data: payloadData, Params?: Params)=> Promise<{successful: boolean, error?: Error}>,
    getNumberOfUsers: (data: payloadData) => Promise<number>
  }
}
export const client = feathers<ServiceType>()

const socketClient = socketio<ServiceType>(socket)

client.configure(socketClient)

// Register a socket client service with all methods listed
client.use('room-membership', socketClient.service('room-membership'), {
  methods: ['find', 'get', 'create', 'update', 'patch', 'remove', 'join', 'getNumberOfUsers']
})
