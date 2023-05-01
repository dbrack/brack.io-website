import * as React from 'react';
import styled from 'styled-components';
import Section from './Section';
import Avatar from './Avatar';

const Title = styled.h1`
	text-align: center;
	font-size: 2rem;
	margin-bottom: 0.1rem;
`;

const TagLine = styled.span`
	font-size: 0.8rem;
	line-height: 1.2rem;
	display: block;
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
			</Section>
			<Section>
				<TagLine>
					Lifelong learner. Agile thinker. Passionate Org-Designer
					&amp; Web Developer.
				</TagLine>
			</Section>
		</>
	);
};

export default Header;
