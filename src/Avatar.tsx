import * as React from 'react';
import styled from 'styled-components';

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
