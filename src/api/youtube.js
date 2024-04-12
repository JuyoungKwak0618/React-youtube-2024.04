import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useVideos = keyword => {
  const {isLoading, error, data: videos} = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      // const uri = keyword ? keywordUri + keyword : popularUri;
      return axios
              .get(`/data/${keyword ? 'search' : 'popular'}.json`)
              // .get(uri)
              .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1,       // 1분, ms 단위로 지정할 수 있음
  });
  return { isLoading, error, videos };
} 

export const useChannelInfo = id => {
  const uri = `https://youtube.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`
  const {data: url} = useQuery({
    queryKey: ['channel',id],
    queryFn: async () => {
      return axios
                  .get('/data/channels.json')
                  // .get(uri)
                  .then(res => res.data.items[0].snippet.thumbnails.default.url)
    },
    staleTime: 1000 * 60 * 5,   // 5분
  });
  return { url };
}

export const useRelatedVideo = channerId => {
  const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${channerId}`;
  const {isLoading, error, data:videos} = useQuery({
    queryKey: ['relatedVideos',channerId],
    queryFn: async () => {
      return axios
                  .get('/data/searchChannel.json')
                  // .get(uri)
                  .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1,   // 1분
  });
  return {isLoading, error, videos };
}