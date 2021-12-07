import { Component } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from './actions';
import { StoreState } from './reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function; // because fetchTodos needs to return a function for redux-thunk, type definition cannot be "typeof fetchTodos"
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class _App extends Component<AppProps, AppState> {
  state = { fetching: false };

  // constructor(props: AppProps) {
  //   super(props);
  //   this.state = { fetching: false };
  // }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.setState({ fetching: true });
    this.props.fetchTodos();
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList = (): JSX.Element[] => {
    return this.props.todos.map((todo: Todo) => (
      <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
        {todo.title}
      </div>
    ));
  };

  render() {
    const { todos } = this.props;
    console.log(todos.slice(0, 10));
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch ToDos</button>
        {this.state.fetching ? 'LOADING' : this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState) => ({
  todos,
});

const mapDispatchToProps = {
  fetchTodos,
  deleteTodo,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
