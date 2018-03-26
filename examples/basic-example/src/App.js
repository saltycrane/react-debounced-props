import { debounce } from "lodash";
import React, { Component } from "react";
import withDebouncedProps from "react-debounced-props";

const MyPrinter = ({ text }) => <span>{text}</span>;

const MyDebouncedPrinter = withDebouncedProps(["text"], func =>
  debounce(func, 500)
)(MyPrinter);

class App extends Component {
  state = {
    text: ""
  };

  render() {
    const { text } = this.state;
    return (
      <div className="App">
        Enter text:{" "}
        <input
          onChange={e => this.setState({ text: e.target.value })}
          type="text"
          value={text}
        />
        <br />
        Text entered: <MyDebouncedPrinter text={text} />
      </div>
    );
  }
}

export default App;
