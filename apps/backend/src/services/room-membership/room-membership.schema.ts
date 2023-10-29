// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { RoomMemberShipServiceService } from './room-membership.class'

// Main data model schema
export const roomMemberShipServiceSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'RoomMemberShipService', additionalProperties: false }
)
export type RoomMemberShipService = Static<typeof roomMemberShipServiceSchema>
export const roomMemberShipServiceValidator = getValidator(roomMemberShipServiceSchema, dataValidator)
export const roomMemberShipServiceResolver = resolve<
  RoomMemberShipService,
  HookContext<RoomMemberShipServiceService>
>({})

export const roomMemberShipServiceExternalResolver = resolve<
  RoomMemberShipService,
  HookContext<RoomMemberShipServiceService>
>({})

// Schema for creating new entries
export const roomMemberShipServiceDataSchema = Type.Pick(roomMemberShipServiceSchema, ['text'], {
  $id: 'RoomMemberShipServiceData'
})
export type RoomMemberShipServiceData = Static<typeof roomMemberShipServiceDataSchema>
export const roomMemberShipServiceDataValidator = getValidator(roomMemberShipServiceDataSchema, dataValidator)
export const roomMemberShipServiceDataResolver = resolve<
  RoomMemberShipService,
  HookContext<RoomMemberShipServiceService>
>({})

// Schema for updating existing entries
export const roomMemberShipServicePatchSchema = Type.Partial(roomMemberShipServiceSchema, {
  $id: 'RoomMemberShipServicePatch'
})
export type RoomMemberShipServicePatch = Static<typeof roomMemberShipServicePatchSchema>
export const roomMemberShipServicePatchValidator = getValidator(
  roomMemberShipServicePatchSchema,
  dataValidator
)
export const roomMemberShipServicePatchResolver = resolve<
  RoomMemberShipService,
  HookContext<RoomMemberShipServiceService>
>({})

// Schema for allowed query properties
export const roomMemberShipServiceQueryProperties = Type.Pick(roomMemberShipServiceSchema, ['_id', 'text'])
export const roomMemberShipServiceQuerySchema = Type.Intersect(
  [
    querySyntax(roomMemberShipServiceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RoomMemberShipServiceQuery = Static<typeof roomMemberShipServiceQuerySchema>
export const roomMemberShipServiceQueryValidator = getValidator(
  roomMemberShipServiceQuerySchema,
  queryValidator
)
export const roomMemberShipServiceQueryResolver = resolve<
  RoomMemberShipServiceQuery,
  HookContext<RoomMemberShipServiceService>
>({})
