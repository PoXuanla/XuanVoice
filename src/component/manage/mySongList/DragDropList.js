import { useState, useEffect, React } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DragSongListItem from './DragSongListItem'
import { replaceSongOrder } from '../../../api/songList'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const Song = (props) => {
  const { song, index } = props
  const deleteSongHandler = (songData) => props.onDelete(songData)
  return (
    <Draggable draggableId={song._id} index={index}>
      {(provided) => (
        <DragSongListItem
          songData={song}
          ref={provided.innerRef}
          provided={provided}
          onDelete={deleteSongHandler}
        />
      )}
    </Draggable>
  )
}
const SongList = (props) => {
  const songs = props.songs
  const deleteSongHandler = (songData) => props.onDelete(songData)
  return songs.map((song, index) => {
    return <Song song={song} index={index} key={song._id} onDelete={deleteSongHandler} />
  })
}
const DragDropList = (props) => {
  const { songsData = [], songListId } = props
  const [songs, setSongs] = useState(songsData)

  const deleteSongHandler = (songData) => props.onDelete(songData)

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const reorderSong = reorder(songs, result.source.index, result.destination.index)

    const updateSongs = reorderSong.map((song, index) => {
      const { order, createdAt, songId, _id } = song
      let ob = { order, createdAt, songId, _id }
      ob.order = index
      return ob
    })
    setSongs(reorderSong)
    props.changeModeToManual()
    await replaceSongOrder(songListId, { songs: updateSongs })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <SongList songs={songs} onDelete={deleteSongHandler} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default DragDropList
