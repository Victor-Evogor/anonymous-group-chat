// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  RoomMemberShipService,
  RoomMemberShipServiceData,
  RoomMemberShipServicePatch,
  RoomMemberShipServiceQuery,
  RoomMemberShipServiceService
} from './room-membership.class'

export type {
  RoomMemberShipService,
  RoomMemberShipServiceData,
  RoomMemberShipServicePatch,
  RoomMemberShipServiceQuery
}

export type RoomMemberShipServiceClientService = Pick<
  RoomMemberShipServiceService,
  (typeof roomMemberShipServiceMethods)[number]
>

export const roomMemberShipServicePath = 'room-membership'

export const roomMemberShipServiceMethods = [ 'create', 'join', 'getNumberOfUsers', 'sendMessage'] as const

export const roomMemberShipServiceClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(roomMemberShipServicePath, connection.service(roomMemberShipServicePath), {
    methods: roomMemberShipServiceMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [roomMemberShipServicePath]: RoomMemberShipServiceClientService
  }
}
