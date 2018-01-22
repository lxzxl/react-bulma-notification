import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import registerServiceWorker from './registerServiceWorker';
import Notification, { Placement } from './lib';
import './style.less';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

hljs.configure({ languages: ['html'] });

interface Props {
  name?: string;
  code?: string;
}

class Snippet extends PureComponent<Props> {
  private code: HTMLElement;
  componentDidMount() {
    return this.code && hljs.highlightBlock(this.code);
  }
  render() {
    const { name = '' } = this.props;
    return (
      <>
        <h2 id={name.toLowerCase()} className="title is-4 is-spaced">
          <a href="#{name}"># {name}</a>
        </h2>
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

class Basic extends PureComponent {
  private count = 0;
  render() {
    const code = `<a className="button is-primary" onClick={() => this.open()}>Open</a>
<a className="button is-primary" onClick={() => this.close()}>Close</a>

open = () => {
  Notification.notice(\`Notification ${this.count}\`, {
    key: ++this.count,
    duration: 0,
    closable: false,
  });
};
close = () => {
  if (this.count > 0) {
    Notification.remove(this.count--);
  }
};
`;
    return (
      <Snippet name="Basic" code={code}>
        <a className="button is-primary" onClick={() => this.open()}>
          Open
        </a>
        <a className="button is-primary" onClick={() => this.close()}>
          Close Last
        </a>
      </Snippet>
    );
  }

  open = () => {
    Notification.notice(`Notification ${this.count}`, {
      key: ++this.count,
      duration: 0,
      closable: false
    });
  };
  close = () => {
    if (this.count > 0) {
      Notification.remove(this.count--);
    }
  };
}

class Colors extends PureComponent {
  render() {
    const code = `<a className="button is-info" onClick={() => this.onClick('info')}>Info</a>
<a className="button is-success" onClick={() => this.onClick('success')}>Success</a>
<a className="button is-warning" onClick={() => this.onClick('warn')}>Warning</a>
<a className="button is-danger" onClick={() => this.onClick('error')}>Error</a>

onClick = (type) => {
  Notification[type](
    <strong>Primar lorem ipsum dolor sit amet, consectetur adipiscing 
    elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
    placerat ut, porta nec nulla.</strong>
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
      <strong>
        Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem
        ipsum dolor. Pellentesque risus mi, tempus quis placerat ut, porta nec
        nulla.
      </strong>
    );
  };
}

class Placements extends PureComponent {
  render() {
    const code = `<a className="button is-primary" onClick={() => this.open()}>Top Right(Default)</a>
<a className="button is-primary" onClick={() => this.open('bottomRight')}>Bottom Right</a>
<a className="button is-primary" onClick={() => this.open('topLeft')}>Top Left</a>
<a className="button is-primary" onClick={() => this.open('bottomLeft')}>Bottom Left</a>
<a className="button is-danger" onClick={() => this.closeAll('bottomRight')}>Close Bottom Right</a>
<a className="button is-danger" onClick={() => this.closeAll()}>Close All</a>

open = (placement?: Placement) => {
  Notification.notice(
    \`Primar lorem ipsum dolor sit amet, consectetur adipiscing 
    elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
    placerat ut, porta nec nulla.\`,
    {
      placement,
      duration: 0
    }
  );
};
closeAll = (placement) => {
  Notification.remove(undefined, placement);
};`;
    return (
      <Snippet name="Placements" code={code}>
        <a className="button is-primary" onClick={() => this.open()}>
          Top Right(Default)
        </a>
        <a
          className="button is-primary"
          onClick={() => this.open('bottomRight')}
        >
          Bottom Right
        </a>
        <a className="button is-primary" onClick={() => this.open('topLeft')}>
          Top Left
        </a>
        <a
          className="button is-primary"
          onClick={() => this.open('bottomLeft')}
        >
          Bottom Left
        </a>
        <a
          className="button is-danger"
          onClick={() => this.closeAll('bottomRight')}
        >
          Close Bottom Right
        </a>
        <a className="button is-danger" onClick={() => this.closeAll()}>
          Close All
        </a>
      </Snippet>
    );
  }
  open = (placement?: Placement) => {
    Notification.notice(
      `Primar lorem ipsum dolor sit amet, consectetur adipiscing 
      elit lorem ipsum dolor. Pellentesque risus mi, tempus quis 
      placerat ut, porta nec nulla.`,
      {
        placement,
        duration: 0
      }
    );
  };
  closeAll = (placement?: Placement) => {
    Notification.remove(undefined, placement);
  };
}

/*
TODO: add ability to change notification order.

class Order extends PureComponent {
  private count = 0;
  render() {
    const code = `checkbox
    <a className="button is-danger" onClick={() => this.onClick()}>Top Right(Default)</a>

onClick = (placement) => {
  Notification.info(
    \`Primar lorem ipsum dolor sit amet, consectetur adipiscing
    elit lorem ipsum dolor. Pellentesque risus mi, tempus quis
    placerat ut, porta nec nulla.\`,
    placement
  );
};`;
    return (
      <Snippet name="Order" code={code}>
        <input
          type="checkbox"
          name="changeOrder"
          onChange={e => this.toggleOrder()}
        />
        <a className="button is-danger" onClick={() => this.onClick()}>
          Click Me
        </a>
      </Snippet>
    );
  }
  toggleOrder = () => {
    Notification.toggleOrder();
  };
  onClick = (placement?: Placement) => {
    Notification.error(`Notification ${++this.count}`, { placement });
  };
}
*/

class Api extends PureComponent {
  render() {
    const optionRows = [
      [
        'content',
        'string | ReactNode',
        '',
        `The content is the main body that will be inserted into the notification. It can be a string or a ReactNode.`
      ],
      [
        'theme',
        `is-primary | is-info | is-success | is-warning | is-danger`,
        'is-primary',
        `The four most frequently used themes.`
      ],
      [
        'key',
        'string | number',
        '',
        `A identify key of the notification, if not provided, an auto key will be generated.`
      ],
      [
        'placement',
        `topLeft | topRight | bottomLeft | bottomRight`,
        `topRight`,
        `Where to place the notification.`
      ],
      [
        'prefixCls',
        'string',
        'bulma-notification',
        `prefix class name for notification container`
      ],
      ['closable', 'boolean', 'true', `Whether to show the close button.`],
      [
        'onClose',
        'function',
        '() => void',
        `Function will be called when notification is closed.`
      ],
      [
        'duration',
        'float',
        '1.5',
        `Seconds that the notification will be peristed. 
 It will be *1000 as millisecond for setTimout. 0 equals no auto close.`
      ],
      ['style', 'object', '', `React style object.`]
    ].map(row => (
      <tr key={row[0]}>
        <td>{row[0]}</td>
        <td className="code">{row[1]}</td>
        <td>{row[2]}</td>
        <td>{row[3]}</td>
      </tr>
    ));
    return (
      <Snippet name="API">
        <pre>
          Notification.notice(content, options?): void;
          <br />
          Notification[info|success|warn|error](content, options?): void;
          <br />
          Notification.remove(key?, placement?): void;
        </pre>
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>name</th>
              <th>type</th>
              <th>default</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>{optionRows}</tbody>
        </table>
      </Snippet>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <Basic />
        <Colors />
        <Placements />
        {/* <Order /> */}
        <Api />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
