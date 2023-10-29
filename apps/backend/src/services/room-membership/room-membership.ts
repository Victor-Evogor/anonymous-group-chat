// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  roomMemberShipServiceDataValidator,
  roomMemberShipServicePatchValidator,
  roomMemberShipServiceQueryValidator,
  roomMemberShipServiceResolver,
  roomMemberShipServiceExternalResolver,
  roomMemberShipServiceDataResolver,
  roomMemberShipServicePatchResolver,
  roomMemberShipServiceQueryResolver
} from './room-membership.schema'

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
    events: ['new-user']
  })
  // Initialize hooks
/*   app.service(roomMemberShipServicePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(roomMemberShipServiceExternalResolver),
        schemaHooks.resolveResult(roomMemberShipServiceResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(roomMemberShipServiceQueryValidator),
        schemaHooks.resolveQuery(roomMemberShipServiceQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(roomMemberShipServiceDataValidator),
        schemaHooks.resolveData(roomMemberShipServiceDataResolver)
      ],
      patch: [
        schemaHooks.validateData(roomMemberShipServicePatchValidator),
        schemaHooks.resolveData(roomMemberShipServicePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
 */
// Add this service to the service type index
}

declare module '../../declarations' {
  interface ServiceTypes {
    [roomMemberShipServicePath]: RoomMemberShipServiceService
  }
}
