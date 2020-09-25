import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 12,
    key: process.env.REACT_APP_GAPI_KEY,
  },
});

export const searchVideos = (searchQuery) =>
  instance.get('/search', {
    params: { q: searchQuery, type: 'video' },
  });

export const getVideoById = async (videoId) =>
  instance.get('/videos', {
    params: {
      id: videoId,
    },
  });

export const getRelatedVideos = async (videoId) =>
  instance.get('/search', {
    params: {
      type: 'video',
      relatedToVideoId: videoId,
    },
  });
