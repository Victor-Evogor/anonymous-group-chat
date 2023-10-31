// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations'
import { RoomMemberShipServiceService } from './room-membership.class'
import { roomMemberShipServicePath, roomMemberShipServiceMethods } from './room-membership.shared'

export * from './room-membership.class'
export * from './room-membership.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const roomMemberShipService = (app: Application) => {
  // Register our service on the Feathers application
  app.use(roomMemberShipServicePath, new RoomMemberShipServiceService(), {
    // A list of all methods this service exposes externally
    methods: roomMemberShipServiceMethods,
    // You can add additional custom events to be sent to clients here
    events: ['new-user', 'new-message']
  })
 }

declare module '../../declarations' {
  interface ServiceTypes {
    [roomMemberShipServicePath]: RoomMemberShipServiceService
  }
}
