import * as React from 'react';
import Notification from 'rc-notification';
import '../styles/Notification.scss';

const defaultCls = 'my-notification';

type Position = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface Options {
  key: string | number;
  content: JSX.Element;
  theme: string;
  position?: Position;
  duration?: null | number;
  closable?: boolean;
  style: object;
}

interface Instance {
  notice(data: object): void;
  removeNotice(key: string): void;
  destroy(): void;
}

const getInstance = (function() {
  let instances: { [k in Position]?: Instance } = {};
  return (placement: Position) => {
    if (!instances[placement]) {
      Notification.newInstance(
        {
          prefixCls: defaultCls,
          className: placement,
          style: {}
        },
        notification => {
          instances[placement] = notification;
        }
      );
    }
    return instances[placement] as Instance;
  };
})();

const defaultPosition = 'topRight';

const defaultOptions: Partial<Options> = {
  position: defaultPosition,
  theme: '',
  closable: false,
  duration: 3,
  style: {}
};

function notice(content: string, options: Partial<Options>) {
  const opt: Partial<Options> = Object.assign({}, defaultOptions, options);
  const placement = opt.position || defaultPosition;
  const notification = getInstance(placement);
  const key = Date.now().toString();

  opt.key = key;
  opt.content = (
    <div className={`notification ${opt.theme}`}>
      <button
        className="delete"
        onClick={e => notification.removeNotice(key)}
      />
      {content}
    </div>
  );

  notification.notice(opt);
}

export default {
  info(content: string) {
    notice(content, { theme: 'is-info' });
  },
  success(content: string) {
    notice(content, { theme: 'is-success' });
  },
  warn(content: string) {
    notice(content, { theme: 'is-warning' });
  },
  error(content: string) {
    notice(content, { theme: 'is-danger' });
  }
};
