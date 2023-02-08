import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';

import { Videos, ChannelCard } from './';


const ChannelDetail = () => {

  const { id } = useParams();

  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setVideos] = useState()

  console.log(channelDetail,videos);
  

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet,&id=${id}`)
      .then((data) => setchannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id]);


  return (
    <Box minHeight="95vh">
      <Box>
        <div 
          style={{background: 'linear-gradient(90deg, rgba(255,56,0,1) 0%, rgba(228,77,46,1) 47%, rgba(255,230,80,1) 100%)', zIndex: 10, height: '300px'}}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-100px"/>
        
      </Box>

      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '150px'}}}/>
          <Videos videos={videos} />
      </Box>

    </Box>
  )
}

export default ChannelDetail