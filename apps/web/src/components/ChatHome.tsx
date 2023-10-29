import Header from './Header'
import Messages from './Messages'
import InputBox from './InputBox'
import Div100vh from '@alminde/react-div-100vh'
import css from '../css/app.module.css'

export const ChatHome = () => {
  return (
    <Div100vh className={css.homeContainer}>
      <Header />
      <Messages />
      <InputBox />
    </Div100vh>
  )
}
