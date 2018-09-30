import * as React from "react";
import { render, getNodeText, fireEvent } from "react-testing-library";
import App from "./test-case";

describe("DerefMobxObservable", () => {
  it("exists", () => {
    expect(App).toBeTruthy();
  });

  it("works", () => {
    const { getByTestId } = render(<App />);
    let shouldNotChange1Initial = getNodeText(
      getByTestId("should-not-change-1")
    );
    let shouldNotChange2Initial = getNodeText(
      getByTestId("should-not-change-2")
    );
    let shouldChangeInitial = getNodeText(getByTestId("should-change"));
    // let shouldChange = get("should-change");
    fireEvent.click(getByTestId("change"));

    let shouldNotChange1 = getNodeText(getByTestId("should-not-change-1"));
    let shouldNotChange2 = getNodeText(getByTestId("should-not-change-2"));
    let shouldChange = getNodeText(getByTestId("should-change"));
    let mappedValue = parseInt(
      getNodeText(getByTestId("should-have-mapped-value")),
      10
    );
    expect(mappedValue).toEqual(3);
    fireEvent.click(getByTestId("change"));
    mappedValue = parseInt(
      getNodeText(getByTestId("should-have-mapped-value")),
      10
    );
    expect(mappedValue).toEqual(4);
    fireEvent.click(getByTestId("change"));
    mappedValue = parseInt(
      getNodeText(getByTestId("should-have-mapped-value")),
      10
    );
    expect(mappedValue).toEqual(5);

    expect(shouldChangeInitial).not.toEqual(shouldChange);
    expect(shouldNotChange1Initial).toEqual(shouldNotChange1);
    expect(shouldNotChange2Initial).toEqual(shouldNotChange2);
  });
});
