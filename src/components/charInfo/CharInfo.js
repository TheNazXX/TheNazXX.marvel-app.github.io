import { useState, useEffect } from 'react';
import MarvelService from '../app/services/MarvelService';
import {Link} from 'react-router-dom';
import {setContent} from '../../utils/setContent';
import './charInfo.scss';

const CharInfo = ({charId}) => {

  const {process, setProcess, getCharacter} = MarvelService();
  const [char, setChar] = useState(null);

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, [charId])

  const onRequest = () => {
    if(!charId) return;
    getCharacter(charId).then(setChar).then(() => setProcess('confirmed'));
  };

  return (
   <div className="char__info">
      {setContent(process, View, char)}
    </div>
  )
}

const View = ({ id, name, img, description, wiki, comics}) => {

    const itemsComics = comics.map(({name}, i) => i < 8 ? <li key={i} className="char__comics-item">{name}</li> : null);
    const check = img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return (
        <>
        <div className="char__basics">
            <img src={img} alt="img" style={check ? {objectFit: 'contain'} : null}/>
            <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
                <Link  to={`/characters/${id}`} className="button button__main">
                  <div className="inner">homePage</div>
                </Link>
                <a href={wiki} className="button button__secondary">
                  <div className="inner">wiki</div>
                </a>
            </div>
            </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {itemsComics.length === 0 ? 'Список пуст' : itemsComics}
        </ul>
        </>
    );
};

export default CharInfo;

