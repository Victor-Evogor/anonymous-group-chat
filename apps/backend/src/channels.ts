// For more information about this file see https://dove.feathersjs.com/guides/cli/channels.html
import '@feathersjs/transport-commons'
import type { Application } from './declarations'

export const channels = (app: Application) => {

  app.on('disconnect', ()=>{
    app.channels.forEach(groupId => {
      // TODO: change event name, 'new-user' to update-number-of-users
      app.service('room-membership').emit('new-user', groupId)
    })
  })

  app.service('room-membership').publish('new-user', (groupId?: string)=>{
    if(!groupId){
      throw new Error('groupId cannot be empty')
    }
    const length = app.channel(groupId).length
    return app.channel(groupId).send(length)
  })

  app.service('room-membership').publish('new-message',(data: any)=>{
    if(!data){
      throw new Error('message payload can\'t be undefined')
    }
    return app.channel(data.groupId).send(data.body)
  })
}
