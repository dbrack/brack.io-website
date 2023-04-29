import * as React from 'react';
import styled from 'styled-components';
import { TwitterIcon, GitHubIcon, LinkedInIcon, MastodonIcon } from './Icons';

const StyledNavigation = styled.nav`
	text-align: center;
	font-size: 2em;
	width: 100%;
`;

const NavigationList = styled.ul`
	list-style: none;
`;

const NavigationItem = styled.li`
	display: inline-block;
	width: 50px;
	height: 50px;
`;

const NavigationLink = styled.a`
	color: rgba(255, 255, 255, 0.25);
	&:hover,
	&:active {
		color: #efefef;
	}
	transition: 250ms cubic-bezier(0.44, 0.39, 0.65, 0.94);
	transform-origin: bottom;
`;

const Navigation = () => {
	return (
		<StyledNavigation>
			<NavigationList>
				<NavigationItem>
					<NavigationLink
						href="https://linkedin.com/in/dominikbrack"
						title="LinkedIn"
						rel="me"
					>
						<LinkedInIcon />
					</NavigationLink>
				</NavigationItem>
				<NavigationItem>
					<NavigationLink
						href="https://github.com/dbrack"
						title="Github"
						rel="me"
					>
						<GitHubIcon />
					</NavigationLink>
				</NavigationItem>
				<NavigationItem>
					<NavigationLink
						href="https://twitter.com/_bracky"
						title="Twitter"
						rel="me"
					>
						<TwitterIcon />
					</NavigationLink>
				</NavigationItem>
				<NavigationItem>
					<NavigationLink
						href="https://me.dm/@dbr"
						title="Mastodon"
						rel="me"
					>
						<MastodonIcon />
					</NavigationLink>
				</NavigationItem>
			</NavigationList>
		</StyledNavigation>
	);
};

export default Navigation;
