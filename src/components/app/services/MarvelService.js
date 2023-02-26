import { useHttp } from "../../../hooks/http.hook";

const MarvelService = () => {
  const _apiKey = '6ac1776b504a62f059d0ae9bceebf3db';
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';


  const {loading, error, request, clearError, process, setProcess} = useHttp();

  const getAllCharacters = async (offset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(elem => _transformCharacter(elem));
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };


  const getComics = async (offset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(elem => _transformComic(elem));
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const getCharByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
    return res.data.results.length === 1 ? _transformCharacter(res.data.results[0]) : 'Такого персонажа нету'
  }


  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description || 'Описание нету :(',
      img: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      description: comic.description || 'There is not description',
      title: comic.title,
      img: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      price: comic.prices[0].price,
      pageCount: comic.pageCount,
      language: comic.textObjects.language || 'en-us'
    };
  };

  return {process, setProcess, loading, error, clearError, getAllCharacters, getCharacter, getComics, getComic, getCharByName};
};




export default MarvelService;

