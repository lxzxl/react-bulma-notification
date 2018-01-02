import { Props } from './Notice.d';
import { Component, Ref } from 'react';
import Notice, { Props as NoticeProps } from './Notice';

interface Props {
  prefixCls: string;
  transitionName: string;
  animation: string | object;
  style: object;
}

interface State {
  notices: Notice[];
}

interface DefaultProps {
  prefixCls: 'rc-notification';
  animation: 'fade';
  style: {
    top: 65;
    left: '50%';
  };
}

interface Config extends Props {
  getContainer: string;
}

interface NewInstance {
  notice(noticeProps: NoticeProps): void;
  removeNotice(key: string): void;
  component: Ref<Notification>;
  destroy(): void;
}

export default class Notification extends Component<Props, State> {
  getTransitionName(): void;

  add: (notice: Notice) => void;

  remove: (key: string) => void;

  static newInstance(
    properties: Config,
    callback: (notification: Notification) => void
  ): void;
}
