import RandomChar from '../../randomChar/RandomChar';
import CharList from '../../charList/CharList';
import CharInfo from '../../charInfo/CharInfo';
import decoration from '../../../resources/img/vision.png'
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import SearchForm from '../../searchForm/searchForm'
import { useState } from "react";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList setSelectedChar={setSelectedChar} />
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
            <SearchForm />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </div>
    </>
  );
};

export default MainPage;
