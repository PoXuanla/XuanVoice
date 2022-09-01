import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showPlayer: false,
  isPlay: false,
  songListData: [],
  currentSongIndex: 0,
  volume: 0.5,
  playMode: ['normal', 'loop'],
  playModeIndex: 0,
  songDuration: 0,
  songCurrentTime: 0
  //'normal' = current song end and stop, 'loop': loop current song
}
export const musicplayerSlice = createSlice({
  name: 'musicplayer',
  initialState,
  reducers: {
    openPlayer: (state) => { 
      state.showPlayer = true
    },
    playSong: (state) => {
      state.isPlay = true
    },
    pauseSong: (state) => {
      state.isPlay = false
    },
    nextSong: (state) => {
      console.log(`next song : `)
      if (state.currentSongIndex === state.songListData.length - 1) {
        state.currentSongIndex = 1
      }
      state.currentSongIndex = state.currentSongIndex + 1
    },
    prevSong: (state) => {
      if (state.currentSongIndex === 0) return
      state.currentSongIndex -= 1
    },
    replaceSongListData: (state, action) => {
      state.songListData = action.payload
      state.currentSongIndex = 0
      state.songCurrentTime = 0
      state.isPlay = true
    },
    changePlayMode: (state) => {
      if (state.playModeIndex === state.playMode.length - 1) {
        state.playModeIndex = 0
        return
      }
      state.playModeIndex += 1
    },
    adjustVolume: (state, action) => {
      state.volume = action.payload
    },
    setSongDuration: (state, action) => {
      state.songDuration = action.payload
    },
    setSongCurrentTime: (state, action) => {
      state.songCurrentTime = action.payload
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload
    }
  }
})
export const {
  openPlayer,
  playSong,
  pauseSong,
  nextSong,
  prevSong,
  replaceSongListData,
  changePlayMode,
  adjustVolume,
  setSongDuration,
  setSongCurrentTime,
  setCurrentSongIndex
} = musicplayerSlice.actions

export default musicplayerSlice.reducer
