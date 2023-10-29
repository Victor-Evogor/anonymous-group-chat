import {FunctionComponent, PropsWithChildren, createContext, useState} from 'react'
import {User} from '../../../../types/User'
import {SetStateType} from '../../../../types/SetStateType'
import randomColor from 'randomcolor';

interface UserContextType {
  user: User;
  setUser: SetStateType<User>,
  nickname: string,
  setNickName: SetStateType<string>
}

export const userContext = createContext<UserContextType | null>(null)

export const UserContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const Provider = userContext.Provider;
  const [user, setUser] = useState<User>({
    color: randomColor()
  })
  const [nickname, setNickName] = useState('')
  return <Provider value={{
    user,
    setUser,
    nickname,
    setNickName
  }}>
    {children}
  </Provider>
}
