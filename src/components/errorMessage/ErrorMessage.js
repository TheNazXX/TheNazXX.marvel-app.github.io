import gif from '../../resources/img/error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <div class="error">
      <img className='error-gif' src={gif} alt="error"/>
    </div>
  );
};

export default ErrorMessage;