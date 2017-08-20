import React, { Component } from 'react';
import withRoot from '../components/withRoot';

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
