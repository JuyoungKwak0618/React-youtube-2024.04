import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
  const navigate = useNavigate();
  if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel' )
    return;
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId; 
  return (
    <li style={{ listStyleType: 'none' }} onClick={() => {
      navigate(`/videos/watch/${videoId}`, {state: {video}})

    }}>
      <img src={thumbnails.medium.url} alt={title} />
      <div>
        <p>{title}</p>
        <p>{channelTitle}</p>
        <p>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}