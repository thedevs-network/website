import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { deepPurple, blue } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const theme = createMuiTheme({
	palette: {
		primary: deepPurple,
		secondary: blue
	}
});

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

function createContext() {
	return {
		jss,
		theme,
		sheetsManager: new WeakMap(),
		sheetsRegistry: new SheetsRegistry()
	}
}

export function setContext() {
	global.__INIT_MATERIAL_UI__ = createContext();
}

export function getContext() {
	if (!process.browser) {
		return global.__INIT_MATERIAL_UI__
	}
	if (!global.__INIT_MATERIAL_UI__) {
		global.__INIT_MATERIAL_UI__ = createContext();
	}

	return global.__INIT_MATERIAL_UI__;
}