import {Params, feathers} from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import type { SocketService } from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import { Message } from '../../../../types/Message'

export const socket = io(import.meta.env.VITE_SERVER)
type PayloadData = {
  groupId: string
}

type ServiceType = {
  'room-membership': SocketService & {
    join: (data: PayloadData, Params?: Params)=> Promise<{successful: boolean, error?: Error}>,
    getNumberOfUsers: (data: PayloadData) => Promise<number>,
    sendMessage: (data: PayloadData & {
      body: Message
    }) => Promise<void>
  }
}
export const client = feathers<ServiceType>()

const socketClient = socketio<ServiceType>(socket)

client.configure(socketClient)

// Register a socket client service with all methods listed
client.use('room-membership', socketClient.service('room-membership'), {
  methods: ['find', 'get', 'create', 'update', 'patch', 'remove', 'join', 'getNumberOfUsers', 'sendMessage']
})
