import React from 'react';
import App from '../components/App';
import Community from '../components/Community';
import Header from '../components/Header';
import Button from 'material-ui/Button';
import { withTheme } from 'material-ui/styles';
import withRoot from '../components/withRoot'

const Index = (props) => {
	return (
		<App>
			<Header />
			<Community />
		</App>
	);
};

export default withRoot(Index);
