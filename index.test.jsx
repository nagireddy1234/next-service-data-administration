import React from 'react';
import renderer from 'react-test-renderer';
import App from './src/App';

it('Checking index file rendring correctly or not.', () => {
    const app = renderer.create(<App />).toJSON();
    expect(app).toMatchSnapshot();
});
