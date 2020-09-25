import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { Heart, HeartFill } from '@styled-icons/bootstrap';

import { useApp } from '../../providers/App';
import { useAuth } from '../../providers/Auth';
import { getVideoById, getRelatedVideos } from '../../api/videos.api';
import { parseString } from '../../utils/parseString';
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../../store/actions';

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 3rem;
`;

const VideoColumn = styled.div`
  width: 70%;
  flex: 0 0 70%;
`;

const SidebarColumn = styled.div`
  width: 30%;
  flex: 0 0 30%;
`;

const VideoWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const VideoInfo = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  color: ${({ theme }) => theme.colors.darkgreen};
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  p {
    line-height: 1.5;
  }
`;

const VideoHeading = styled.div`
  display: flex;
  align-items: center;
`;

const HeartButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.green};
  &:focus,
  &:active {
    outline: none;
  }
`;

const RelatedVideo = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: ${({ theme }) => `solid 2px ${theme.colors.darkgreen}`};
  text-decoration: none;
  &:not(:first-of-type) {
    margin-top: -2px;
  }
`;

const RelatedVideoImg = styled.div`
  width: 30%;
  flex: 0 0 30%;
  position: relative;
  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
`;

const RelatedVideoData = styled.div`
  width: 70%;
  flex: 0 0 70%;
  padding: 10px;
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.darkgreen};
    font-size: 1.2rem;
  }
`;

const VideoPage = () => {
  const { state, dispatch } = useApp();
  const { authenticated } = useAuth();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      const result = await getVideoById(id);
      setVideo(result.data.items[0]);
    };
    const selectedVideo = state.videos.find(
      (currentVideo) => currentVideo.id.videoId === id
    );
    if (selectedVideo) {
      setVideo(selectedVideo);
    } else {
      fetchVideo();
    }
  }, [id, state.videos]);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      const result = await getRelatedVideos(id);
      setRelatedVideos(result.data.items);
    };
    fetchRelatedVideos();
  }, [id]);

  return (
    <PageLayout>
      <VideoColumn>
        <VideoWrapper>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={parseString(video?.snippet?.title)}
            allowFullScreen
          />
        </VideoWrapper>
        <VideoInfo>
          <VideoHeading>
            <h1>{parseString(video?.snippet?.title)}</h1>
            {authenticated &&
              (state.favoriteVideos.find(
                (currentVideo) => currentVideo.id.videoId === id
              ) ? (
                <HeartButton
                  type="button"
                  onClick={() => dispatch({ type: REMOVE_FROM_FAVORITES, payload: id })}
                >
                  <HeartFill size="20" />
                </HeartButton>
              ) : (
                <HeartButton
                  type="button"
                  onClick={() => dispatch({ type: ADD_TO_FAVORITES, payload: video })}
                >
                  <Heart size="20" />
                </HeartButton>
              ))}
          </VideoHeading>
          <p>{parseString(video?.snippet?.description)}</p>
        </VideoInfo>
      </VideoColumn>
      <SidebarColumn>
        {!!relatedVideos &&
          relatedVideos.map((relatedVideo) => (
            <RelatedVideo
              key={relatedVideo.id.videoId}
              to={`/video/${relatedVideo.id.videoId}`}
            >
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
          ))}
      </SidebarColumn>
    </PageLayout>
  );
};

export default VideoPage;
