import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { App } from './App';
import { reducers } from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// interface Props<T> {
//   items: T[];
//   renderItem: (item: T) => React.ReactNode;
// }

// const List = <T extends unknown>(props: Props<T>) => {
//   const { items, renderItem } = props;
//   const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
//   return (
//     <div>
//       {items.map(renderItem)}
//       <button onClick={() => setState(items)}>Clone</button>
//       {JSON.stringify(state, null, 8)}
//     </div>
//   );
// };
// const Hoge: FC = () => {
//   const items = ['hoge', 'hogehoge'];
//   return <List items={items} renderItem={(item) => <p>{item}</p>} />;
// };

// const Fuga = () => {
//   const items = ['fuga', 'fugafuga'];
//   return <List items={items} renderItem={(item) => <p>{item}</p>} />;
// };

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//       </div>
//     );
//   }
// }
