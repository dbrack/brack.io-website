import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		background: #24292e;
		height: 100%;
		margin-top: 80px;
		font: 16px Helvetica, sans-serif;
		color: #efefef;
		height: 50vh;
		display: flex;
  		justify-content: center;
  		align-items: center;
	}
`;

const App = () => {
	return (
		<>
			<Header />
			<Navigation />
			<GlobalStyle />
		</>
	);
};

export default App;
