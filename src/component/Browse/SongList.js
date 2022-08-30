import { useSelector } from 'react-redux'
import SongWatchList from '../SongWatchList/SongWatchList'
import { Wrapper } from './BrowseStyle'

const SongList = ({ songListData }) => {
  const { isLoading } = useSelector((state) => state.load)

  return (
    <Wrapper>
      <SongWatchList songListData={songListData} mode='show' isLoading={isLoading} />
    </Wrapper>
  )
}
export default SongList
