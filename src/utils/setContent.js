import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";


const setContent = (process, Component, data) => {
  switch (process){
    case 'waiting': return <Skeleton />;
    case 'loading': return <Spinner />;
    case 'confirmed': return Component ? <Component {...data}/> : null;
    case 'error': return <ErrorMessage/>;
    default: throw new Error('Unxpected process state');
  }
}

const setContentWithoutSkeleton = (process, Component, data) => {
  switch (process){
    case 'waiting': return <Spinner />;
    case 'loading': return <Spinner />;
    case 'confirmed': return Component ? <Component {...data}/> : null;
    case 'error': return <ErrorMessage/>;
    default: throw new Error('Unxpected process state');
  }
}

export {setContent, setContentWithoutSkeleton};
