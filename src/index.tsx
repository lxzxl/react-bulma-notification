import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';
import Notification from './lib';

class App extends React.Component {
  render() {
    return (
      <>
        <button onClick={() => this.onClick('info')}>Info</button>
        <button onClick={() => this.onClick('success')}>Success</button>
        <button onClick={() => this.onClick('warn')}>Warning</button>
        <button onClick={() => this.onClick('error')}>Error</button>
      </>
    );
  }

  onClick = (type: 'info' | 'success' | 'warn' | 'error') => {
    Notification[type](<strong>Test content!</strong>);
  };
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
