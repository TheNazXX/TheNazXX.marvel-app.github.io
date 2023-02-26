import MarvelService from '../app/services/MarvelService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {setContentWithoutSkeleton} from '../../utils/setContent';
import './comicsList.scss';

const ComicsList = () => {

    const {process, setProcess, clearError, getComics} = MarvelService();
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(210) 

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);

    const onRequest = () => {
        clearError();
        getComics(offset).then(onLoaded).then(() => setProcess('confirmed'));
    };

    const onLoaded = (newItems) => {
        setComics(comics => [...comics, ...newItems]);
        setOffset(offset => offset + 8);
    };

    const content = <View data={comics}/>

    return (
        <div className="comics__list">
            {content}
            {setContentWithoutSkeleton(process)}
            <button onClick={onRequest} className="button button__main button__long" disabled={process === 'loading'}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

const View = ({ data }) => {
    return (
        <ul className="comics__grid">
            <TransitionGroup component={null}>
                {
                    data && data.map(({id, title, img, price}, i) => {
                        return (
                            <CSSTransition key={i} classNames={"comics__item"} timeout={500}>
                                <li key={i} className="comics__item">
                                    <Link to={`/comics/${id}`}>
                                        <img src={img} alt="ultimate war" className="comics__item-img" />
                                        <div className="comics__item-name">{title}</div>
                                        <div className="comics__item-price">{price}$</div>
                                    </Link>
                                </li>
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        </ul>
    );
};

export default ComicsList;
