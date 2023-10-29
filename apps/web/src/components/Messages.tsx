import { Box, Typography, SxProps } from '@mui/material'
import { Message } from '../../../../types/Message'
import { FunctionComponent, useContext, useState, createContext, useEffect } from 'react'
import moment from 'moment'
import { userContext } from '../contexts/User'
import { SetStateType } from '../../../../types/SetStateType'
import { useNavigate } from 'react-router-dom'
import { client } from '../feathers/client'


interface RepliedMessageContextType {
  repliedMessageId: string
  setRepliedMessageId: SetStateType<string>
}
const repliedMessage = createContext<RepliedMessageContextType | null>(null)

const MessageComponent: FunctionComponent<Message> = ({
  authorId,
  timestamp,
  authorName,
  image,
  message,
  id,
  color
}) => {
  const time = moment(timestamp).format('h:mm:ss a')
  const { user } = useContext(userContext)!
  const isUserMessage = authorId === user.id
  const userColor = '#7180ac'
  const otherUserColor = '#9130ff99'
  const otherUserColorDark = '#1030ac'
  const { repliedMessageId, setRepliedMessageId } = useContext(repliedMessage)!
  const isMessageBeingRepliedTo = repliedMessageId === id

  const messageBoxStyle: SxProps = {
    justifySelf: isUserMessage ? 'flex-end' : 'flex-start',
    width: 'max-content',
    minWidth: isUserMessage? 'initial' : '30vw',
    maxWidth: '40vw',
    backgroundColor: isUserMessage
      ? userColor
      : isMessageBeingRepliedTo
      ? otherUserColorDark
      : otherUserColor,
    borderRadius: isUserMessage ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem'
  }

  return (
    <Box
      display="grid"
      sx={{
        marginY: 1
      }}
    >
      <Box
        sx={messageBoxStyle}
        onDoubleClick={() => {
          console.log('double click working')
          if (!isUserMessage) {
            if (repliedMessageId === id) {
              setRepliedMessageId('')
            } else {
              setRepliedMessageId(id)
            }
          }
        }}
      >
        {!isUserMessage ? (
          <Typography
            variant="caption"
            sx={{
              fontWeight: 'bold',
              color,
              paddingLeft: 1
            }}
          >
            {authorName}
          </Typography>
        ) : (
          <></>
        )}
        {image?
          <img src={image} style={{
            borderTopRightRadius: isUserMessage ? 'inherit' : 0,
            borderTopLeftRadius: isUserMessage ? 'inherit' : 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%'
          }}/>
        : <></>}
        <Typography component='div' sx={{
          margin: '.5rem .6rem',
          whiteSpace: 'pre-wrap'
        }}>{message}</Typography>
        <Typography variant="caption" sx={{
          margin: '.5rem .6rem'
        }}>{time}</Typography>
      </Box>
    </Box>
  )
}

const Messages = () => {
  const [repliedMessageId, setRepliedMessageId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const Provider = repliedMessage.Provider
  const { user } = useContext(userContext)!
  const navigate = useNavigate()
  client.service('room-membership').on('new-message', (data: Message)=>{
    console.log(data)
    setMessages(messages.concat([data]))
  })
  messages.sort((prevMessage, currentMessage) => {
    const a = new Date(prevMessage.timestamp).getTime()
    const b = new Date(currentMessage.timestamp).getTime()
    return a - b
  })

  const styles: SxProps = {
    paddingY: '1.3rem',
    flexGrow: 1,
    overflowY: 'auto'
  }

  useEffect(()=>{
    if (!user.id){
      navigate('/')
      return () => {}
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])



  return (
    <Box sx={styles}>
      <Provider
        value={{
          repliedMessageId,
          setRepliedMessageId
        }}
      >
        {messages.map((message, index) => {
          return <MessageComponent {...message} key={index} />
        })}
      </Provider>
    </Box>
  )
}

export default Messages
