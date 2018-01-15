import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';
import Notification from './lib';
import './style.less';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { Placement } from 'rc-notification';

hljs.configure({ languages: ['html'] });

interface Props {
  name?: string;
  code?: string;
}

class Snippet extends PureComponent<Props> {
  private code: HTMLElement;
  componentDidMount() {
    hljs.highlightBlock(this.code);
  }
  render() {
    return (
      <>
        <h2 className="title is-4 is-spaced">{this.props.name}</h2>
        <div className="snippet">
          <div className="snippet-preview">{this.props.children}</div>
          {this.props.code && (
            <div className="snippet-code">
              <pre>
                <code ref={(code: HTMLElement) => (this.code = code)}>
                  {this.props.code}
                </code>
              </pre>
            </div>
          )}
        </div>
      </>
    );
  }
}

class Colors extends PureComponent {
  render() {
    const code = `<a className="button is-info" onClick={() => this.onClick('info')}>Info</a>
<a className="button is-success" onClick={() => this.onClick('success')}>Success</a>
<a className="button is-warning" onClick={() => this.onClick('warn')}>Warning</a>
<a className="button is-danger" onClick={() => this.onClick('error')}>Error</a>

onClick = (type) => {
  Notification[type](
    \`Primar lorem ipsum dolor sit amet, consectetur adipiscing 
    elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
    placerat ut, porta nec nulla.\`
  );
};`;
    return (
      <Snippet name="Colors" code={code}>
        <a className="button is-info" onClick={() => this.onClick('info')}>
          Info
        </a>
        <a
          className="button is-success"
          onClick={() => this.onClick('success')}
        >
          Success
        </a>
        <a className="button is-warning" onClick={() => this.onClick('warn')}>
          Warning
        </a>
        <a className="button is-danger" onClick={() => this.onClick('error')}>
          Error
        </a>
      </Snippet>
    );
  }

  onClick = (type: 'info' | 'success' | 'warn' | 'error') => {
    Notification[type](
      `Primar lorem ipsum dolor sit amet, consectetur adipiscing 
      elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
      placerat ut, porta nec nulla.`
    );
  };
}

class Placements extends PureComponent {
  render() {
    const code = `<a className="button is-info" onClick={() => this.onClick()}>Top Right(Default)</a>
<a className="button is-info" onClick={() => this.onClick('bottomRight')}>Bottom Right</a>
<a className="button is-info" onClick={() => this.onClick('topLeft')}>Top Left</a>
<a className="button is-info" onClick={() => this.onClick('bottomLeft')}>Bottom Left</a>

onClick = (placement) => {
  Notification.info(
    \`Primar lorem ipsum dolor sit amet, consectetur adipiscing 
    elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
    placerat ut, porta nec nulla.\`,
    placement
  );
};`;
    return (
      <Snippet name="Placements" code={code}>
        <a className="button is-info" onClick={() => this.onClick()}>
          Top Right(Default)
        </a>
        <a
          className="button is-info"
          onClick={() => this.onClick('bottomRight')}
        >
          Bottom Right
        </a>
        <a className="button is-info" onClick={() => this.onClick('topLeft')}>
          Top Left
        </a>
        <a
          className="button is-info"
          onClick={() => this.onClick('bottomLeft')}
        >
          Bottom Left
        </a>
      </Snippet>
    );
  }
  onClick = (placement?: Placement) => {
    Notification.info(
      `Primar lorem ipsum dolor sit amet, consectetur adipiscing 
      elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
      placerat ut, porta nec nulla.`,
      placement
    );
  };
}

class App extends Component {
  render() {
    return (
      <>
        <Colors />
        <Placements />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
