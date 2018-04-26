/**
 * Basic render test
 */

import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { App } from '../App';

import mock from 'xhr-mock';

jest.mock('../config');

let renderer: ShallowRenderer.ShallowRenderer;
declare var global: any;

// needed in react-instantsearch

beforeAll(() => {
	renderer = ShallowRenderer.createRenderer();
	mock.setup();
});

afterAll(() => {
	mock.teardown();
});

describe('Client basics', () => {
	global.chrome = { extension: { getURL: jest.fn() }};
	it('App should render', () => {
		renderer.render(<App/>, null);
		const result: {} = renderer.getRenderOutput();
		expect(result).toBeTruthy();
		expect.assertions(1);
	});
});
