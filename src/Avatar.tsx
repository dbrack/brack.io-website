import * as React from 'react';
import styled from 'styled-components';

const CircularPicture = styled.img`
	border-radius: 50%;
	height: 8rem;
`;

const Avatar = () => {
	const avatar = new URL('./assets/portrait.jpeg?width=400', import.meta.url);
	return <CircularPicture src={avatar.pathname} alt="Portrait" />;
};

export default Avatar;
