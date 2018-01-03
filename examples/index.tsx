import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';
import Notification from '../src/index';

class App extends React.Component {
  render() {
    return (
      <>
        <h2>hello</h2>
        <h2>hello</h2>
        <h2>hello</h2>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
