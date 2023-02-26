import { Component } from "react";

class ErrorBoundary extends Component{
  state = {
    error: false
  };

  componentDidCatch(){
    this.setState({
      error: true
    });
  };

  render(){
    const {error} = this.state;

    return error ? 'Something went wrong' : this.props.children
  };
};

export default ErrorBoundary;