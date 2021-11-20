import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routing, { routingProps } from './routing';

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    {routing.map((item: routingProps) => (
                        <Route exact={item.isExact} path={item.path} component={item.component} />
                    ))}
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
