import { Box, Typography, SxProps } from '@mui/material'
import { Message } from '../../../../types/Message'
import { FunctionComponent, useContext, useState, createContext, useEffect } from 'react'
import moment from 'moment'
import { userContext } from '../contexts/User'
import { SetStateType } from '../../../../types/SetStateType'
import { useNavigate } from 'react-router-dom'


interface RepliedMessageContextType {
  repliedMessageId: string
  setRepliedMessageId: SetStateType<string>
}
const repliedMessage = createContext<RepliedMessageContextType | null>(null)

const MessageComponent: FunctionComponent<Message> = ({
  authorId,
  timestamp,
  attachment,
  audio,
  authorAvatar,
  authorName,
  image,
  message,
  id
}) => {
  const time = moment(timestamp).format('h:mm:ss a')
  const { user } = useContext(userContext)!
  console.log(user.id)
  const isUserMessage = authorId === user.id
  const userColor = '#7180ac'
  const otherUserColor = '#9130ff99'
  const otherUserColorDark = '#1030ac'
  const { repliedMessageId, setRepliedMessageId } = useContext(repliedMessage)!
  const isMessageBeingRepliedTo = repliedMessageId === id

  const messageBoxStyle: SxProps = {
    justifySelf: isUserMessage ? 'flex-end' : 'flex-start',
    width: 'max-content',
    backgroundColor: isUserMessage
      ? userColor
      : isMessageBeingRepliedTo
      ? otherUserColorDark
      : otherUserColor,
    padding: '.2rem 1rem',
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
              fontWeight: 'bold'
            }}
          >
            {authorName}
          </Typography>
        ) : (
          <></>
        )}
        <Typography>{message}</Typography>
        <Typography variant="caption">{time}</Typography>
      </Box>
    </Box>
  )
}

const Messages = () => {
  const [repliedMessageId, setRepliedMessageId] = useState<string>('')
  const Provider = repliedMessage.Provider
  const messages: Message[] = []
  const { user } = useContext(userContext)!
  console.log(user.id)
  const navigate = useNavigate()
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
