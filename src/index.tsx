import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { KittyHatsWeb } from './KittyHatsWeb';
import { KittyHatsCryptoGoods } from './KittyHatsCryptoGoods';

// This app will initially be initialized but invisible till a user clicks a marketplace button
export function initReactAppInContainer(appContainerId) {
	ReactDOM.render(
		(
			<Router>
				<div>
					<Route exact path='/' render={(props) => <KittyHatsWeb container={appContainerId} version='1.0.0' />}/>
					<Route path='/cg/:id' render={(props) => <KittyHatsCryptoGoods container={appContainerId} version='1.0.0' />}/>
				</div>
			</Router>
		),
		document.getElementById(appContainerId)
	);
}
