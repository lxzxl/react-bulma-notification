<big><h1 align="center">react-bulma-notification</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/react-bulma-notification">
    <img src="https://img.shields.io/npm/v/react-bulma-notification.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/lxzxl/react-bulma-notification">
    <img src="https://img.shields.io/coveralls/lxzxl/react-bulma-notification.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/lxzxl/react-bulma-notification">
    <img src="https://img.shields.io/travis/lxzxl/react-bulma-notification.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/react-bulma-notification">
    <img src="http://img.shields.io/npm/dm/react-bulma-notification.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/lxzxl/react-bulma-notification.svg">
    <img src="https://david-dm.org/lxzxl/react-bulma-notification.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/lxzxl/react-bulma-notification/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-bulma-notification.svg?style=flat-square"
         alt="License">
  </a>
</p>

<p align="center"><big>
A simple notification component for react and bulma css framework.
</big></p>

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
    };
  }
}
```

## Documentation

http://lxzxl.github.io/react-bulma-notification
