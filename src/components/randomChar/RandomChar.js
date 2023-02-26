import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import MarvelService from '../app/services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

import './randomChar.scss';

const setContent = (process, Component, data) => {
  switch (process){
    case 'waiting': return <Spinner />;
    case 'confirmed': return <Component {...data}/>;
    case 'loading': return <Spinner />;
    case 'error': return <ErrorMessage/>;
    default: throw new Error('Unxpected process state');
  }
}

const RandomChar = () => {
  
  const {process, clearError, getCharacter} = MarvelService();
  const [char, setChar] = useState(null);
  
  useEffect(() => {
    onUpdateChar();
    // eslint-disable-next-line
  }, []);

  const onUpdateChar = () => {
    clearError();
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(setChar);
  };

  return (
    <div className="randomchar">
      
        {setContent(process, View, char)}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={onUpdateChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
    </div>
  )
}

const View = ({ id, name, description, img, homePage, wiki }) => {
  const check = img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  return (
    <div className="randomchar__block">
      <img src={img} alt="Random character" className="randomchar__img" style={check ? {objectFit: 'contain'} : null} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <div className="randomchar__descr">{description ? description : 'Описания нету :('}</div>
        <div className="randomchar__btns">
          <Link to={`/marvel-app/${id}`} className="button button__main">
            <div className="inner">home-page</div>
          </Link>
          <a href={wiki} className="button button__secondary">
            <div className="inner"> wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar


