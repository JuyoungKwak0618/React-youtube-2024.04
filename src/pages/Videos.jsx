import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "../components/VideoCard";
import {Grid, Card, CardContent } from '@mui/material';
import { useVideos } from '../api/youtube';

const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;

export default function Videos() {
  const { keyword } = useParams();
  // const {isLoading, error, data: videos} = useQuery({
  //   queryKey: ['videos', keyword],
  //   queryFn: async () => {
  //     const uri = keyword ? keywordUri + keyword : popularUri;
  //     return axios
  //             // .get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //             .get(uri)
  //             .then(res => res.data.items);
  //   },
  //   staleTime: 1000 * 60 * 1,       // 1분, ms 단위로 지정할 수 있음
  // });
  // useEffect(() => {
  //   axios.get(`/data/${keyword ? 'search' : 'popular'}.json`)
  //     .then(res => {
  //       setVideos(res.data.items);
  //       console.log(videos);
  //     });
  // }, [keyword]);
  const {isLoading, error, videos} = useVideos(keyword);
  return (
    <>
      {/* <div>Videos {keyword ? `${keyword}로 검색` : 'Hot Trend'}</div> */}
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {videos && (
     <Grid container spacing={2}>
      {videos.map(video => (
        <Grid item key={video.id} xs={12} sm={6} md={4} lg={3} style={{marginTop:10}}>
          <Card sx={{ height: '400px'}}>
            <CardContent>
              <VideoCard video={video} />
            </CardContent>
          </Card>
        </Grid>
      ))}
   </Grid>
      )}
    </>
  )
}