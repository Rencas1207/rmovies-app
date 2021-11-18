import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import { Loading } from '../../components/Loading/Loading';

export const VideoList = ({ id }) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    const getVideos = () => {
      setTimeout(async () => {
        const res = await tmdbApi.getVideos(category, id);
        setVideos(res.results.slice(0, 5));
        setloading(false);
      }, 2000);
    };
    getVideos();
    return () => setVideos('');
  }, [category, id]);

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        videos.map((item, i) => (
          <Video key={i} item={item} loading={loading} />
        ))}
    </>
  );
};

const Video = ({ item }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);
  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};
