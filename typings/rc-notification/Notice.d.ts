import { Component } from 'react';

export interface Props {
  duration: number;
  onClose(): void;
  children: any;
  className: string;
  prefixCls?: string;
  closable?: boolean;
}

interface DefaultProps {
  onEnd(): void;
  onClose(): void;
  duration: 1.5;
  style: {
    right: '50%';
  };
}

export default class Notice extends Component<Props> {
  private closeTimer: NodeJS.Timer | null;

  close: () => void;

  startCloseTimer: () => void;

  clearCloseTimer: () => void;
}
