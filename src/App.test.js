import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import renderer from 'react-test-renderer';

test('renders ok', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <App />
            </Provider>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
