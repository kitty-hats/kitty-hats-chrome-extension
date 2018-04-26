import * as $ from 'jquery';
import * as _ from 'lodash';
import * as React from 'react';
import * as c from './colors';

// tslint:disable:max-line-length

export class Splash extends React.Component<{}, {}> {
	public render() {
		const splashNo = _.random(1, 3);
		let color;
		if (splashNo === 1) {
			color = c.BackgroundColor.mintgreen.tint;
		} else if (splashNo === 2) {
			color = c.BackgroundColor.sizzurp.tint;
		} else if (splashNo === 3) {
			color = c.BackgroundColor.topaz.tint;
		}
		// tslint:disable:jsx-no-multiline-js
		// alert(randomColor.tint);
		return (
		<div style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25, backgroundColor: color }}>
			<div style={{ height: '40px', display: 'flex', alignItems: 'center', marginTop: '-8px', marginBottom: '10px'}}>
				<img src={'img/icon.png'} style={{ height: '40px', width: '40px', borderRadius: '25px', boxShadow: '0px 3px 15px rgba(0,0,0,0.07)', border: '1px #949494 solid' }}/>
				<p className={'Header-wordmark'} style={{ color: '#2a2825'}}> KittyHats </p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', marginTop: '1vh', backgroundColor: color, height: '90%' }}>
				<img
					style={{height: '100vh', position: 'fixed', top: 0, right: 0 }}
					src={`img/landing-${splashNo}.png`}
				/>
				<div style={{ display: 'block'}}>
					<h1 style={{letterSpacing: '-3.23px', lineHeight: 1.2, fontSize: '3em'}}> Hats, apparel and accessories </h1>
					<h1 style={{letterSpacing: '-3.23px', lineHeight: 1.2, fontSize: '3em'}}> for your CryptoKitties </h1>
					{((window as any).web3 !== undefined ?
						(<h4 style={{ fontSize: '1.7em', fontWeight: 300, marginTop: '50px'}}> To get started, unlock Metamask </h4>)
						: <div style={{ marginTop: '30px'}}> <a href='https://cryptokitties.co/' target='_blank' className='Button Button--love Button--largest Button--cta'> CryptoKitties </a> <a href='https://metamask.io/' target='_blank' className='Button Button--buy Button--largest Button--cta'> Install Metamask </a> </div> )
					}
				</div>
			</div>
		</div>);
	}
}
