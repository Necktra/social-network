import SamuraiJsApp from './App';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
const div = document.createElement('div');
ReactDOM.render(<SamuraiJsApp />, div);
ReactDOM.unmountComponentAtNode(div);
});
