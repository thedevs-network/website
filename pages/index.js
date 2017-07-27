import React from 'react';
import Link from 'next/link';
import App from '../components/App';
import Header from '../components/Header';
import Button from 'material-ui/Button';
import { withTheme } from 'material-ui/styles';

export default (props) => {
	return (
		<App>
			<Header />
		</App>
	);
};
