import React from "react";

import { Container } from './styles';

function Avatar({ user, width, height, fontSize }) {
    return (
        <Container width={width} height={height} fontSize={fontSize}>
            {user?.avatar ? (
                <img src={user.avatar} alt={"profile avatar"} />
            ) : (
                <span>{user.name[0]}</span>
            )}
        </Container>
    );
}

export default Avatar;
