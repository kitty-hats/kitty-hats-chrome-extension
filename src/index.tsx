import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { KittyHatsWeb } from './KittyHatsWeb';
import { KittyHatsCryptoGoods } from './KittyHatsCryptoGoods';

// This app will initially be initialized but invisible till a user clicks a marketplace button
export function initReactAppInContainer(appContainerId) {
	ReactDOM.render(
		(
			<Router>
				<Switch>
					<Route exact path='/' render={(props) => <KittyHatsWeb container={appContainerId} version='1.0.0' />}/>
					<Route path='/cg/:id' render={(props) => <KittyHatsCryptoGoods props={props} container={appContainerId} version='1.0.0' />}/>
				</Switch>
			</Router>
		),
		document.getElementById(appContainerId)
	);
}
