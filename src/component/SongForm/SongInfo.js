import { useEffect, useState, forwardRef } from 'react'
import { Grid, Box, Typography, TextField } from '@mui/material'

const SongInfo = forwardRef((props, ref) => {
  const song = props.song
  const [name, setName] = useState('') //歌名
  const [intro, setIntro] = useState('') //簡介
  const [lyric, setLyric] = useState('') //歌詞
  const { nameRef, introRef, lyricRef } = ref.current

  useEffect(() => {
    if (song) {
      if (song.name) setName(song.name)
      if (song.intro) setIntro(song.intro)
      if (song.lyric) setLyric(song.lyric)
    }
  }, [song])
  //data 要傳到parent 使用
  return (
    <>
      <Typography
        variant='subtitle1'
        sx={{ fontWeight: 700, marginBottom: 2, color: 'text.primary' }}
      >
        歌曲資訊
      </Typography>
      <TextField
        required
        id='outlined-required'
        label='歌名'
        value={name}
        inputRef={nameRef}
        onChange={(e) => setName(e.target.value)}
        sx={{ width: '100%', marginBottom: 2 }}
      />
      <Grid container spacing={2}>
        {/* 歌曲介紹 */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='filled-multiline-static'
            label='歌曲介紹'
            multiline
            value={intro}
            inputRef={introRef}
            onChange={(e) => setIntro(e.target.value)}
            rows={4}
            sx={{ width: '100%' }}
          />
        </Grid>
        {/* 歌詞介紹 */}
        <Grid item xs={12} sm={6}>
          <TextField
            id='filled-multiline-static'
            label='歌詞介紹'
            multiline
            value={lyric}
            inputRef={lyricRef}
            onChange={(e) => setLyric(e.target.value)}
            rows={4}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </>
  )
})
export default SongInfo
