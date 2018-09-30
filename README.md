# deref-mobx-observable

[![BundlePhobia][bundlephobia-badge]][bundlephobia-href]

> Deref mobx observables deep in your component directory for better performance.

[![NPM](https://img.shields.io/npm/v/deref-mobx-observable.svg)](https://www.npmjs.com/package/deref-mobx-observable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Build Status](https://travis-ci.org/rakannimer/deref-mobx-observable.svg?branch=master)](https://travis-ci.org/rakannimer/deref-mobx-observable)

## Install

```bash
yarn add deref-mobx-observable  # Or npm install --save deref-mobx-observable
```

## Usage

```tsx
import * as React from "react";
import { observable } from "mobx";
import Deref from "deref-mobx-observable";
const val = observable.box(1);

export default class App extends React.Component<{ Deref: typeof Deref }> {
  static defaultProps = {
    Deref
  };
  render() {
    const { Deref } = this.props;
    return (
      <div>
        <div>
          <h2>👇 won't be re-rendered</h2>
          <pre data-testid="should-not-change-1">{Date.now()}</pre>
        </div>
        <Deref obs={val}>
          {value => (
            // This will be re-rendered
            <div>
              <h2>👇 will be re-rendered</h2>
              <pre data-testid="should-change">{Date.now()}</pre>
              <pre data-testid="should-change-value">
                {JSON.stringify(value)}
              </pre>
            </div>
          )}
        </Deref>
        <h2>👇 won't be re-rendered</h2>
        <button
          onClick={() => {
            val.set(val.get() + 1);
          }}
          data-testid="change"
        >
          <pre> Increment </pre>
          <pre data-testid="should-not-change-2"> {Date.now()} </pre>
        </button>
      </div>
    );
  }
}
```

## License

MIT © [rakannimer](https://github.com/rakannimer)

[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/deref-mobx-observable.svg
[bundlephobia-href]: https://bundlephobia.com/result?p=deref-mobx-observable
