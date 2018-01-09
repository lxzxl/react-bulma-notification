import * as React from 'react';
import './index.less';
import Notification, {
  NoticeProps,
  NotificationInstance,
  Position
} from 'rc-notification';

const defaultCls = 'bulma-notification';
type Content = NoticeProps['content'];

interface Options extends NoticeProps {
  theme: string;
  position?: Position;
  children?: string | JSX.Element;
  className?: string;
  prefixCls?: string;
}

const getInstance = (function() {
  let instances: { [k in Position]?: NotificationInstance } = {};
  return (
    placement: Position,
    callback: (instance: NotificationInstance) => void
  ) => {
    if (instances[placement]) {
      return callback(instances[placement] as NotificationInstance);
    }
    return Notification.newInstance(
      {
        prefixCls: defaultCls,
        className: placement,
        style: {}
      },
      (notification: NotificationInstance) => {
        instances[placement] = notification;
        callback(notification);
      }
    );
  };
})();

const defaultPosition: Position = 'topRight';

const defaultOptions: Partial<Options> = {
  position: defaultPosition,
  theme: '',
  closable: false,
  duration: 0,
  style: {}
};

function notice(content: Content, options: Partial<Options>) {
  const opt: Partial<Options> = Object.assign({}, defaultOptions, options);
  const placement = opt.position || defaultPosition;
  return getInstance(placement, (notification: NotificationInstance) => {
    const key = Date.now().toString();
    const props: NoticeProps = {
      key,
      content: (
        <div className={`notification ${opt.theme}`}>
          <button
            className="delete"
            onClick={e => notification.removeNotice(key)}
          />
          {content}
        </div>
      ),
      closable: opt.closable,
      duration: opt.duration,
      style: opt.style
    };
    notification.notice(props);
  });
}

export default {
  info(content: Content) {
    notice(content, { theme: 'is-info' });
  },
  success(content: Content) {
    notice(content, { theme: 'is-success' });
  },
  warn(content: Content) {
    notice(content, { theme: 'is-warning' });
  },
  error(content: Content) {
    notice(content, { theme: 'is-danger' });
  }
};
