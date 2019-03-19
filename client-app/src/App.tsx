import React from "react";
import styles from "./App.scss";
interface AppProps {
  todos: string[];
}
interface AppState {
  todos: string[];
  inputValue: string;
}

class App extends React.Component {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      todos: [],
      inputValue: ""
    };
  }

  addItem = () => {
    const { todos, inputValue } = this.state as AppState;
    todos.push(inputValue);
    this.setState({ todos, inputValue: "" });
  };

  renderTodos = (todos: string[]) => {
    return todos.map((todo, index) => (
      <span key={index}>
        {index + 1}: {todo}
      </span>
    ));
  };

  render() {
    const { todos, inputValue } = this.state as AppState;
    let toDosRendered: any[] = [];
    if (todos) {
      toDosRendered = this.renderTodos(todos);
    }
    const disabled = !inputValue.length;

    return (
      <div className={styles.app}>
        <input
          onChange={e => {
            this.setState({ inputValue: e.target.value });
          }}
          value={inputValue}
        />
        <button onClick={this.addItem} disabled={disabled}>
          Add todo
        </button>
        {toDosRendered}
      </div>
    );
  }
}

export default App;
