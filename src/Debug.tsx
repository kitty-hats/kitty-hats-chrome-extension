import * as $ from 'jquery';
import * as _ from 'lodash';
import * as React from 'react';
import config from './config';
import { KittyItem } from './KittyItem';

interface IDebugProps {
	kittyId: number;
	apiOwner: string;
	kittyCoreOwner: string;
	// tslint:disable-next-line:ban-types
	onOwnershipUpdated: Function;
}
export class Debug extends React.Component<IDebugProps, {}> {
	public constructor(props) {
		super(props);
		this.ownKittyClicked = this.ownKittyClicked.bind(this);
		this.disownKittyClicked = this.disownKittyClicked.bind(this);
	}

	public async ownKittyClicked(event) {
		const success = await KittyItem.setKittyCoreOwner(this.props.kittyId);
		this.props.onOwnershipUpdated();
	}

	public async disownKittyClicked(event) {
		const success = await KittyItem.resetKittyCoreOwner(this.props.kittyId);
		this.props.onOwnershipUpdated();
	}

	public render() {
		const { ownKittyClicked, disownKittyClicked } = this;
		const { kittyId, kittyCoreOwner, apiOwner } = this.props;
		return  (
		<div style={{position: 'fixed', top: 5, right: 10, zIndex: 50, transform: 'scale(0.8)', backgroundColor: 'rgba(255,255,255,0.5'}}>
			<input
				readOnly={true}
				type={'text'}
				placeholder={'KittyCore contract address'}
				value={config.kittyCoreAddress}
				style={{ padding: '0.5rem'}}
			/>
			<p style={{ lineHeight: '15px', fontSize: '12px', margin: 0}}> <b>API Owner:</b> {apiOwner} </p>
			<p style={{ lineHeight: '15px', fontSize: '12px', margin: 0}}> <b>KittyCore Owner:</b> {kittyCoreOwner} </p>
			<button onClick={ownKittyClicked} > Own kitty </button>
			<button onClick={disownKittyClicked} > Disown kitty </button>

		</div>);
	}
}
