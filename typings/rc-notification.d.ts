declare module 'rc-notification' {
  import { Component, Ref, ReactNode } from 'react';

  export type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

  export interface NoticeProps {
    key?: string | number;
    content: string | ReactNode;
    closable?: boolean;
    onClose?(): void;
    duration?: number;
    style?: object;
  }

  class Notice extends Component<NoticeProps> {
    private closeTimer: NodeJS.Timer | null;
    close: () => void;
    startCloseTimer: () => void;
    clearCloseTimer: () => void;
  }

  interface Props {
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    animation?: string | object;
    style?: object;
  }

  interface State {
    notices: Notice[];
  }

  interface Config extends Props {
    getContainer?: string;
  }

  export interface NotificationInstance {
    notice(noticeProps: Props): void;
    removeNotice(key: string): void;
    component: Ref<Notification>;
    destroy(): void;
  }

  export default class Notification extends Component<Props, State> {
    static newInstance(
      properties: Config,
      callback: (notification: NotificationInstance) => void
    ): void;
    getTransitionName(): void;
    add: (notice: Notice) => void;
    remove: (key: string) => void;
  }
}
