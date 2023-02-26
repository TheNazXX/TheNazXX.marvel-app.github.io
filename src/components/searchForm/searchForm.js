import { Form, Field, Formik} from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import MarvelService from '../app/services/MarvelService';
import { Link } from 'react-router-dom';
import SpinnerDots from '../spinner/SpinnerDots';

import './searchForm.scss';

const SearchForm = () => {
  const {loading, error, clearError, getCharByName} = MarvelService();
  const [char, setChar] = useState(null);

  let content;
  const errorBlock = error && !loading ? <div className='search-form__title title-mt'>Что пошло не так...</div> : null
  const loader = loading ? <SpinnerDots /> : null

  if(char && typeof(char) !== 'string' && !loading){
    content = <View {...char}></View>
  }else if(typeof(char) === 'string' && !loading){
    content = <div className='search-form__title title-mt'>Такого персонажа нету!</div>
  }else{
    content = null;
  }

  

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(2, 'Минимум 2 символа!').required('Заполните поле!'),
      })}
      onSubmit={({name}) => {
        clearError();
        getCharByName(name).then(setChar);
      }}
    >
      {({ errors, touched, }) => {
        
        return (
        <Form className="search-form" >
          <div className="search-form__title" style={{marginTop: '15px'}}>Find character by name</div>
          <div className="search-form__inner">
            <Field  className={`search-form__input ${errors.name && touched.name ? 'search-form__input-error' : null}`}
                    placeholder="Enter name"
                    name="name"
            />
            <button className="button button__main" type="submit" disabled={loading}>
              <div className="inner">Find</div>
            </button>
          </div>
          {errors.name && touched.name ? <div className='search-form__error'>{errors.name}</div> : null}
          {content}
          {errorBlock}
          <div className='title-mt'>
            {loader}
          </div>
        </Form>
      )}}
    </Formik>
  );
};

const View = ({name, id}) => {
  return (
    <div className="search-form__inner">
      <div className="search-form__title search-form__title--green">There is! Visit {name} page?</div>
      <Link to={`/characters/${id}`} className="search-form__button button button__secondary">
        <div className="inner">To Page</div>
      </Link>
    </div>
  )
}

export default SearchForm;
