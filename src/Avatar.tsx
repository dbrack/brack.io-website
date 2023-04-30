import * as React from 'react';
import styled from 'styled-components';

/* const CircularPicture = styled.picture`
	width: 250px;
	height: 150px;
	border-radius: 50%;
	overflow: hidden;

	float: left;
	margin-left: 125px;
	margin-top: 20px;
`; */

const CircularPicture = styled.img`
	border-radius: 50%;
`;

const Avatar = () => {
	const avatar = new URL('./assets/portrait.jpeg?width=100', import.meta.url);
	return (
		<div>
			<CircularPicture src={avatar.pathname} alt="Portrait" />
		</div>
	);
};

export default Avatar;
