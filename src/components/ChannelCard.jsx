import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop }) => {

  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { md: "320px", xs: "100%" },
        height: '326px',
        margin:'auto',
        marginTop: { marginTop }
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent sx={{ display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center', color:'#fff' }}>
        <CardMedia
          component="img"
          image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture} 
          alt={channelDetail?.snippet?.title}
          sx={{ height: 180, width: 180 , borderRadius: 50, mb: 2, border: '1px solid #e3e3e3' }}
          />
          <Typography variant="h6">
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography variant="body2" color="white">
            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
            </Typography>
          )} 


        </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard