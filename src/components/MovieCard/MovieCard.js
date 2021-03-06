import React from 'react';

import { category as CategoryApi } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import Button from '../Button/Button';

import { Link } from 'react-router-dom';

import './MovieCard.scss';
// import { Loading } from '../Loading/Loading';

const MovieCard = React.memo(({ category, item }) => {
  const link = '/' + CategoryApi[category] + '/' + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
});

export default MovieCard;
