// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import '@feathersjs/transport-commons'
import type { Application } from './declarations'
import {Message} from '../../../types/Message'

export const channels = (app: Application) => {

  app.service('messages').publish('created', (data: Message & {groupId: string})=>{
    return app.channel(data.groupId).send(data)
  })

  app.service('room-membership').publish('new-user', (groupId?: string)=>{
    if(!groupId){
      throw new Error('groupId cannot be empty')
    }
    const length = app.channel(groupId).length
    return app.channel(groupId).send(length)
  })
}
