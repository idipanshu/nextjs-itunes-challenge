import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError(error) {
    if (error) {
      return { error: true };
    }
  }

  componentDidCatch(error) {
    throw Error(error);
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
