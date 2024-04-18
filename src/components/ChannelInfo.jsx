import React from "react";  
import { Stack } from "@mui/material";
import { useChannelInfo } from "../api/youtube";

export default function ChannelInfo({ id, name}) {
  // const uri = `https://youtube.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`
  // const {data: url} = useQuery({
  //   queryKey: ['channel',id],
  //   queryFn: async () => {
  //     return axios
  //                 .get('/data/channels.json')
  //                 // .get(uri)
  //                 .then(res => res.data.items[0].snippet.thumbnails.default.url)
  //   },
  //   staleTime: 1000 * 60 * 5,   // 5분
  // });
  const { url } = useChannelInfo(id);

  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={2}>
     {url && <img src={url} alt={name} />}
     <h4>{name}</h4>
    </Stack>
  );
}