import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

// This app will initially be initialized but invisible till a user clicks a marketplace button
export function initReactAppInContainer(appContainerId) {
	ReactDOM.render(
		<App container={appContainerId} version='1.0.0'/>,
		document.getElementById(appContainerId)
	);
}
