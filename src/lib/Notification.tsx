import React from 'react';
import './style.less';
import Notification, {
  NoticeProps,
  NotificationInstance,
  Placement
} from 'rc-notification';

const defaultCls = 'bulma-notification';
type Content = NoticeProps['content'];

interface Options extends NoticeProps {
  theme: string;
  placement?: Placement;
  children?: string | JSX.Element;
  className?: string;
  prefixCls?: string;
}

const getInstance = (function() {
  let instances: { [k in Placement]?: NotificationInstance } = {};
  return (
    placement: Placement = defaultPlacement,
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

const defaultPlacement: Placement = 'topRight';

const defaultOptions: Partial<Options> = {
  placement: defaultPlacement,
  theme: '',
  closable: true,
  duration: 0,
  style: {}
};

function notice(content: Content, options: Partial<Options>) {
  const opt: Partial<Options> = Object.assign({}, defaultOptions, options);
  return getInstance(opt.placement, (notification: NotificationInstance) => {
    const key = Date.now().toString();
    const props: NoticeProps = {
      key,
      content: (
        <div className={`notification ${opt.theme}`}>
          {opt.closable ? (
            <button
              className="delete"
              onClick={e => notification.removeNotice(key)}
            />
          ) : null}
          {content}
        </div>
      ),
      closable: false,
      duration: opt.duration,
      style: opt.style
    };
    notification.notice(props);
  });
}

export default {
  notice(placement?: Placement) {
    return false;
  },
  info(content: Content, placement?: Placement) {
    notice(content, { theme: 'is-info', placement });
  },
  success(content: Content, placement?: Placement) {
    notice(content, { theme: 'is-success', placement });
  },
  warn(content: Content, placement?: Placement) {
    notice(content, { theme: 'is-warning', placement });
  },
  error(content: Content, placement?: Placement) {
    notice(content, { theme: 'is-danger', placement });
  }
};
