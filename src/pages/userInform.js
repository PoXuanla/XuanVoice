import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import { clearLoading, setLoading } from '../slice/loadSlice'
import { getUserInform } from '../api/user'
import NotFoundUser from '../component/UserInform/NotFoundUser'
import Infrom from '../component/UserInform/Inform'
import SongCollection from '../component/UserInform/SongCollection'

const UserInform = () => {
  const { isLoading } = useSelector((state) => state.load)
  const dispatch = useDispatch()
  const account = useParams().account

  const [userInform, setUserInform] = useState('')
  const [userSongs, setUserSongs] = useState([])
  const [userExist, setUserExist] = useState(true)

  useEffect(() => {
    const getInform = async () => {
      try {
        dispatch(setLoading())
        const response = await getUserInform(account)
        const { inform: userInform } = response
        const { songs: userSongs } = response.inform
        setUserInform(userInform)
        setUserSongs(userSongs)
        dispatch(clearLoading())
      } catch (e) {
        setUserExist(false)
        dispatch(clearLoading())
      }
    }
    getInform()
  }, [])

  return (
    <Container maxWidth={'md'} sx={{ mt: 2, pb: 2 }}>
      {!isLoading && !userExist && <NotFoundUser />}
      {userExist && (
        <>
          <Infrom userInform={userInform} isLoading={isLoading} />
          <SongCollection userSongs={userSongs} isLoading={isLoading} />
        </>
      )}
    </Container>
  )
}
export default UserInform
