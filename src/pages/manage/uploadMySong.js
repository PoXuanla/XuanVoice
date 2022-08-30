import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { createSong } from '../../api/song'
import SongForm from '../../component/manage/MySong/SongForm'

const UploadMySong = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (formData) => {
    try {
      dispatch(setLoading())
      await createSong(formData)
      dispatch(clearLoading())
      navigate('/manage/song', { replace: true })
    } catch (e) {}
  }

  return <SongForm mode={'create'} onSubmit={submitHandler}></SongForm>
}
export default UploadMySong
