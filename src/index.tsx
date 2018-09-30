/**
 * @class DerefObservable
 */

import * as React from "react";
import { observe, IObservableValue } from "mobx";
import { renderAndAddProps } from "render-and-add-props";
export type Props = { text: string };

type DerefObservableProps<T> = {
  obs: IObservableValue<T>;
  children: (value: T) => any;
  map?: ({ newValue, oldValue }: { newValue: T; oldValue?: T }) => any;
  fireImmediately?: boolean;
};

type DerefObservableState<T> = { value?: T };

export class DerefObservable<T> extends React.Component<
  DerefObservableProps<T>,
  DerefObservableState<T>
> {
  listeners = [] as (ReturnType<typeof observe>)[];
  state = {} as DerefObservableState<T>;
  static defaultProps = {
    fireImmediately: true
  };
  componentDidMount() {
    const { obs, fireImmediately, map } = this.props;
    const stopObserving = observe(
      obs,
      ({ newValue, oldValue }) => {
        this.setState({
          value: map ? map({ newValue, oldValue }) : newValue
        });
      },
      fireImmediately
    );
    this.listeners.push(stopObserving);
  }
  componentWillUnmount() {
    this.listeners.forEach(unsub => unsub());
  }
  render() {
    const { children } = this.props;
    if (!this.state.value) {
      return null;
    }
    return renderAndAddProps(children, this.state.value);
  }
}

export default DerefObservable;
