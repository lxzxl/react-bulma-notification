import React from 'react';
import './style.less';
import Notification, {
  Key,
  NoticeProps,
  NotificationInstance
} from 'rc-notification';

const defaultCls = 'bulma-notification';
type Content = NoticeProps['content'];
export type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
type Theme =
  | 'is-primary'
  | 'is-info'
  | 'is-success'
  | 'is-warning'
  | 'is-danger';

interface Options
  extends Pick<
      NoticeProps,
      'key' | 'closable' | 'onClose' | 'duration' | 'style'
    > {
  theme?: Theme;
  placement?: Placement;
  prefixCls?: string;
}

const defaultPlacement: Placement = 'topRight';
const defaultOptions: Options = {
  placement: defaultPlacement,
  theme: 'is-primary',
  closable: true,
  style: {}
};
const AllInstances = (function() {
  let instances: { [k in Placement]?: NotificationInstance } = {};
  return {
    get(options: Options, callback: (instance: NotificationInstance) => void) {
      const {
        placement = defaultPlacement,
        prefixCls = defaultCls,
        style
      } = options;
      if (instances[placement]) {
        return callback(instances[placement] as NotificationInstance);
      }
      return Notification.newInstance(
        {
          prefixCls,
          style,
          className: placement
        },
        (notification: NotificationInstance) => {
          instances[placement] = notification;
          callback(notification);
        }
      );
    },
    getAll() {
      return instances;
    },
    remove(placement: Placement) {
      delete instances[placement];
    }
  };
})();

function notice(content: Content, options?: Options) {
  const opt: Partial<Options> = Object.assign({}, defaultOptions, options);
  return AllInstances.get(opt, (notification: NotificationInstance) => {
    const key = opt.key || Date.now().toString();
    const onClose = () => {
      notification.removeNotice(key);
      return opt.onClose && opt.onClose();
    };
    const props: NoticeProps = {
      key,
      onClose,
      content: (
        <div className={`notification ${opt.theme}`}>
          {opt.closable ? (
            <button className="delete" onClick={e => onClose()} />
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

function remove(key?: Key, placement?: Placement) {
  const allInstances = AllInstances.getAll();
  function removeByPlacement(p: Placement) {
    const instance = allInstances[p];
    if (instance) {
      if (key) {
        instance.removeNotice(key);
      } else {
        instance.destroy();
        AllInstances.remove(p); // clear that instance.
      }
    }
  }
  if (placement) {
    removeByPlacement(placement);
  } else {
    Object.keys(allInstances).forEach(removeByPlacement);
  }
}

type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type HandlerOptions = Omit<Options, 'theme'>;

export default {
  remove,
  notice(content: Content, options?: Options) {
    return notice(content, options);
  },
  info(content: Content, options?: HandlerOptions) {
    notice(content, { theme: 'is-info', ...options });
  },
  success(content: Content, options?: HandlerOptions) {
    notice(content, { theme: 'is-success', ...options });
  },
  warn(content: Content, options?: HandlerOptions) {
    notice(content, { theme: 'is-warning', ...options });
  },
  error(content: Content, options?: HandlerOptions) {
    notice(content, { theme: 'is-danger', ...options });
  }
};
