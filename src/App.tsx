import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		background: #161b22;
		font: 1rem Helvetica, sans-serif;
		color: #efefef;
		margin: 3rem 1rem 1rem;
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
