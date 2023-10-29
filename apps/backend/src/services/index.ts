import { roomMemberShipService } from './room-membership/room-membership'
import { message } from './messages/messages'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(roomMemberShipService)
  app.configure(message)
  // All services will be registered here
}
