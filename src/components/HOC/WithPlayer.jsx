import React from 'react'
import Player from '../Player';

const WithPlayer = WrappedComponent => {

  return class WithPlayerHOC extends React.Component {
    render() {
      const myProps = {

      };

      return (
        <>
          <WrappedComponent {...this.props} {...myProps} />
          <Player />
        </>)
    }
  };
};
export default WithPlayer