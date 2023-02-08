import { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {

  const {id} = useParams();

  const [videoDetail, setVideoDetail] = useState("")
  const [videos, setVideos] = useState()
  
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}`)
      .then((data) => {setVideos(data.items)})
    
  },[id]);

  


  return (
    <Box minHeight="95vh">
      <Stack direction={{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{ widht: '100%', position: 'sticky', top: '86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls/>
            <Typography color="#fff" varient="h5" fontWeight="bold" p={2}>
            {videoDetail?.snippet?.title} 
            </Typography>
            <Stack direction='row' justifyContent='space-between' sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                <Typography color="#fff" varient={{sm:'subtitle1', md:'h6'}} fontWeight="bold" p={1} >
                  {videoDetail?.snippet?.channelTitle} <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction='row'>
              <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank">
                <Typography variant="body1" sx={{ opacity: 0.7, mr:'10px', color:'#fff'}}>
                  Open In Youtube
                </Typography>
              </a>
                <Typography variant="body1" sx={{ opacity: 0.7, mr:'10px'}}>
                  {parseInt(videoDetail?.statistics?.viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7}}>
                  {parseInt(videoDetail?.statistics?.likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md:1,sm:5}} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column"/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail