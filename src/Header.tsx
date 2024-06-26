import * as React from 'react';
import styled from 'styled-components';
import Section from './Section';
import Avatar from './Avatar';

const Title = styled.h1`
	text-align: center;
	font-size: 2.5rem;
	margin-bottom: 0.1rem;
`;

const TagLine = styled.span`
	font-size: 1rem;
	line-height: 1.5rem;
	display: block;
	overflow-wrap: break-word;
	text-wrap: wrap;
	&::before {
		content: open-quote;
		font-weight: bolder;
		color: rgba(255, 255, 255, 0.5);
		font-size: 1.6rem;
	}
	&::after {
		content: close-quote;
		font-weight: bolder;
		color: rgba(255, 255, 255, 0.5);
		font-size: 1.6rem;
	}
`;

const Header = () => {
	return (
		<>
			<Section>
				<Avatar />
			</Section>
			<Section>
				<Title>Dominik Brack</Title>
				<TagLine>
					Lifelong learner. Agile thinker. Passionate Product Person
					&amp; Software Engineer.
				</TagLine>
			</Section>
		</>
	);
};

export default Header;
