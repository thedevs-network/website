import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { withTheme } from 'material-ui/styles';
import withRoot from '../components/withRoot'

import Header from '../components/Header';
import Community from '../components/Community';
import Footer from '../components/Footer';

class Index extends Component {
	render() {
		return (
			<div>
				<Header />
				<Community groups={this.props.url.query} />
				<Footer />
			</div>
		);
	}
}

export default withRoot(Index);
