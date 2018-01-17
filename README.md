# react-bulma-notification

An notification component for react and bulma css framework.

## Install

`npm i -S react-bulma-notification`

## Usage

```typescript
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import Notification from 'react-bulma-notification';
import 'react-bulma-notification/css/index.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <a className="button is-danger" onClick={() => this.onClick('error')}>
          Error
        </a>button
      </div>
    );

    onClick = () => {
        Notification.error('This is an error!');
    }
  }
}
```

## Document

http://lxzxl.github.io/react-bulma-notification
