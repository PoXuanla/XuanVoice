import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { createSong } from '../../api/song'
import SongForm from '../../component/manage/mySong/SongForm'

const UploadMySong = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (formData) => {
    dispatch(setLoading())
    await createSong(formData).then(() => {
      dispatch(clearLoading())
      navigate('/manage/song', { replace: true })
    })
  }
  
  return <SongForm mode={'create'} onSubmit={submitHandler}></SongForm>
}
export default UploadMySong
