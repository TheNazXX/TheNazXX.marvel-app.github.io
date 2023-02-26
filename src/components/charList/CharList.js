import MarvelService from '../app/services/MarvelService';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {setContentWithoutSkeleton} from '../../utils/setContent';

import './charList.scss';

const CharList = ({setSelectedChar}) => {
    const {process, setProcess, clearError, getAllCharacters} = MarvelService();

    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setEndedChar] = useState(false);

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);
  
    const onRequest = () => {
        clearError();
        getAllCharacters(offset).then(onLoaded).then(() => setProcess('confirmed'));
    };

    const onLoaded = (newItems) => {
        if(newItems.length < 9) setEndedChar(true);
        setData(data => [...data, ...newItems]);
        setOffset(offset => offset + 9);
    };

    return (
    <div className="char__list">
        <View data={data} setSelectedChar={setSelectedChar}/>;
        {setContentWithoutSkeleton(process)}
        <button
            className="button button__main button__long"
            disabled={process === 'loading'}
            style={charsEnded ? {display: 'none'}: null}
            onClick={onRequest}>

            <div className="inner">load more</div>
        </button>
    </div>
    );
};

const View = ({data, setSelectedChar}) => {

    const itemRefs = useRef([]);
    
    const onCharClick = (id, i) => {
        setSelectedChar(id);
        
        itemRefs.current.forEach(elem => elem.classList.remove('char__item_selected'));
        itemRefs.current[i].classList.add('char__item_selected');
    }

    const items = data && data.map(({id, name, img}, i) => {
        let check = img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        
        return (
            <CSSTransition key={id} classNames={'char__item'} timeout={500}>
                <li tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={id}
                    className={`char__item`}
                    onClick={() => onCharClick(id, i)}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            onCharClick(id, i);
                        };
                    }}
                    >
                    <img src={img} alt="img" style={check ? {objectFit: 'contain'}: null}/>
                    <div className="char__name">{name}</div>
                </li>
            </CSSTransition>
        );
    });


    return (
        <ul className="char__grid">
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        </ul>
    );
};

export default CharList;

