import React, { Component } from "react";
import { observable } from "mobx";
import Deref from "deref-mobx-observable";

const val = observable.box(1);

const Emoji = ({ children }) => (
  <span role="img" aria-label="below">
    {children}
  </span>
);
export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>
            <Emoji>{"👇"}</Emoji> won't be re-rendered
          </h2>
          <pre data-testid="should-not-change-1">{Date.now()}</pre>
        </div>
        <Deref obs={val}>
          {value => (
            // This will be re-rendered
            <div>
              <h2>
                <Emoji>{"👇"}</Emoji> will be re-rendered
              </h2>
              <pre>{Date.now()}</pre>
              <pre>{JSON.stringify(value)}</pre>
            </div>
          )}
        </Deref>
        <h2>
          <Emoji>{"👇"}</Emoji> won't be re-rendered
        </h2>
        <button
          onClick={() => {
            val.set(val.get() + 1);
          }}
        >
          <pre> Increment </pre>
          <pre data-testid="should-not-change-2"> {Date.now()} </pre>
        </button>
      </div>
    );
  }
}
