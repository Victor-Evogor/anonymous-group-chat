// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterParams } from '@feathersjs/mongodb'

import type {
  RoomMemberShipService,
  RoomMemberShipServiceData,
  RoomMemberShipServicePatch,
  RoomMemberShipServiceQuery
} from './room-membership.schema'
import { app } from '../../app'
import { generateRandomString } from '../../../../../utils/generateRandomString'
import { Message } from '../../../../../types/Message'

export type {
  RoomMemberShipService,
  RoomMemberShipServiceData,
  RoomMemberShipServicePatch,
  RoomMemberShipServiceQuery
}

export interface RoomMemberShipServiceParams extends MongoDBAdapterParams<RoomMemberShipServiceQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class RoomMemberShipServiceService {
  async create(_: any, params: Params){
    if(params.connection){
      const groupId = generateRandomString(5)
      app.channel(groupId).join(params.connection)
      return groupId
    }
  }

  async join(data: any, params: Params){
    if (params.connection){
      if(app.channels.includes(data.groupId)){
        app.channel(data.groupId).join(params.connection)
        app.service('room-membership').emit('new-user', data.groupId)
        return {successful: true}
      } else {
        return {successful: false, error: new Error('channel doesn\'t exists')}
      }
    }
  }

  async getNumberOfUsers(data: any){
    return app.channel(data.groupId).length
  }

  async sendMessage(data: {
    body: Message,
    groupId: string
  }){
    console.log('received message',data)
    app.service('room-membership').emit('new-message', data)
  }
}
