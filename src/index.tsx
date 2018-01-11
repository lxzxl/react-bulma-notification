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
    Notification[type](
      `Primar lorem ipsum dolor sit amet, consectetur adipiscing 
      elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
      placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit 
      amet fringilla. Nullam gravida purus diam, et dictum`,
      'bottomRight'
    );
  };
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
