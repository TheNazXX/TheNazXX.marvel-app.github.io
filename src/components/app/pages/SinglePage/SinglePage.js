import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import AppBanner from '../../../appBanner/AppBanner';
import {setContentWithoutSkeleton} from '../../../../utils/setContent';

import './singlePage.scss';

const SinglePage = ({Component, dataType}) => {
  const [item, setItem] = useState(null);
  const {itemId} = useParams();
  const {process, setProcess, clearError, getComic, getCharacter} = MarvelService();

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line
  }, [])


  const onRequest = () => {
    clearError();
    switch(dataType){
      case 'comic': getComic(itemId).then(setItem).then(() => setProcess('confirmed')); break;
      case 'char': getCharacter(itemId).then(setItem).then(() => setProcess('confirmed')); break;
      default: return null;
    }
  }

  return (
    <>
      <AppBanner />
      {setContentWithoutSkeleton(process, Component, item)}
    </>
  )
};

export default SinglePage;