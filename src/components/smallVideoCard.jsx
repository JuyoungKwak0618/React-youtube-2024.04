import React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";


import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

export default function SmallVideoCard({ video }) {
  const navigate = useNavigate();
  const videoId = video.id.videoId;
  const {title, thumbnails, publishedAt } = video.snippet;
  return (
    <Stack onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} })}}  >
        <Stack direction={'row'} spacing={1}>
        <img src={thumbnails.medium.url} alt={title} style={{ width: 120, height: 90 }} />
        <div style={{textAlign:'left'}}>
          <Typography sx={{fontSize:13}}>{title}</Typography>
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
        </Stack>
    </Stack>
  );
}