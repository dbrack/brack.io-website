import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		background: #24292e;
		font: 1rem Helvetica, sans-serif;
		color: #efefef;
		margin: 5rem 1rem 2rem;
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
