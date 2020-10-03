import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, HeartFill } from '@styled-icons/bootstrap';

import { useApp } from '../../providers/App';
import { useAuth } from '../../providers/Auth';
import { getVideoById, getRelatedVideos } from '../../api/videos.api';
import { parseString } from '../../utils/parseString';
import PageLayout from './PageLayout.styled';
import VideoColumn from './VideoColumn.styled';
import SidebarColumn from './SidebarColumn.styled';
import VideoWrapper from './VideoWrapper.styled';
import VideoInfo from './VideoInfo.styled';
import VideoHeading from './VideoHeading.styled';
import HeartButton from './HeartButton.styled';
import RelatedVideo from './RelatedVideo.styled';
import RelatedVideoImg from './RelatedVideoImg.styled';
import RelatedVideoData from './RelatedVideoData.styled';
import { getVideoId } from '../../utils/getVideoId';

const VideoPage = () => {
  const { videos, favoriteVideos, addToFavorites, removeFromFavorites } = useApp();
  const { authenticated } = useAuth();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const result = await getVideoById(id);
        setVideo(result.data.items[0]);
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const selectedVideo = videos.find((currentVideo) => {
      const currentVideoId = getVideoId(currentVideo);
      return currentVideoId === id;
    });
    if (selectedVideo) {
      setVideo(selectedVideo);
    } else {
      fetchVideo();
    }
  }, [id, videos]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const result = await getRelatedVideos(id);
        setRelatedVideos(result.data.items);
      } catch (error) {
        return null;
      }
    };
    fetchRelatedVideos();
  }, [id]);

  return (
    <PageLayout>
      <VideoColumn>
        <VideoWrapper>
          <iframe
            data-testid="iframe"
            src={`https://www.youtube.com/embed/${id}`}
            title={parseString(video?.snippet?.title)}
            allowFullScreen
          />
        </VideoWrapper>
        <VideoInfo>
          <VideoHeading data-testid="videoHeading">
            <h1>{parseString(video?.snippet?.title)}</h1>
            {authenticated &&
              (favoriteVideos.find((currentVideo) => {
                const currentVideoId = getVideoId(currentVideo);
                return currentVideoId === id;
              }) ? (
                <HeartButton
                  type="button"
                  onClick={() => removeFromFavorites(id)}
                  data-testid="removeFromFavorites"
                >
                  <HeartFill size="20" />
                </HeartButton>
              ) : (
                <HeartButton
                  type="button"
                  onClick={() => addToFavorites(video)}
                  data-testid="addToFavorites"
                >
                  <Heart size="20" />
                </HeartButton>
              ))}
          </VideoHeading>
          <p data-testid="videoDescription">{parseString(video?.snippet?.description)}</p>
        </VideoInfo>
      </VideoColumn>
      <SidebarColumn>
        {!!relatedVideos &&
          relatedVideos.map((relatedVideo) => {
            const relatedVideoId = getVideoId(relatedVideo);
            return (
              <RelatedVideo key={relatedVideoId} to={`/video/${relatedVideoId}`}>
                <RelatedVideoImg>
                  <img
                    src={relatedVideo.snippet.thumbnails.medium.url}
                    alt={parseString(relatedVideo.snippet.title)}
                  />
                </RelatedVideoImg>
                <RelatedVideoData>
                  <h2>{parseString(relatedVideo.snippet.title)}</h2>
                </RelatedVideoData>
              </RelatedVideo>
            );
          })}
      </SidebarColumn>
    </PageLayout>
  );
};

export default VideoPage;
