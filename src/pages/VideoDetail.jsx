import React from "react";
import { useLocation } from 'react-router-dom';
import RelatedVideos from "../components/RelatedVideos";
import ChannelInfo from "../components/ChannelInfo";
import { Grid, Box } from '@mui/material';


export default function VideoDetail() {
  const { state: {video} } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  return(
      <Grid container spacing={2} style={{marginTop: 5}}>
        <Grid item xs={9} md={9}>
            <iframe id='player' type='text/html' width='100%' height={640}
              src={`https://www.youtube.com/embed/${video.id}`} title={title}/>
          <div>
            <p>{title}</p>
            <ChannelInfo id={channelId} name={channelTitle} />
            <pre>{description}</pre>
          </div>
         </Grid>
         <Grid item xs={9} md={3}>
         <RelatedVideos id={channelId} name={channelTitle}/>
         
         </Grid>
      </Grid>
  );
}