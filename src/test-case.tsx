import * as React from "react";
import { observable } from "mobx";
import Deref from "./index";
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
        <Deref obs={val} map={({ oldValue, newValue }) => newValue + 1}>
          {value => (
            // This will be re-rendered
            <div>
              <h2>👇 will be re-rendered</h2>
              <pre data-testid="should-change">{Date.now()}</pre>
              <pre data-testid="should-have-mapped-value">{value}</pre>
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
