import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Container, Avatar, Info, Name, Check } from './styles';

const UserCard = ({ name, avatar, onPress, selected, ...rest }) => {
    return (
        <Container type={'button'} onClick={onPress} {...rest}>
            <Avatar>
                {avatar ? <img alt={'Avatar'} src={avatar} /> : (name.length > 0) ? name[0] : '-'}
            </Avatar>
            <Info>
                <Name>{name}</Name>
            </Info>
            {selected &&
                <Check>
                    <FaCheckCircle />
                </Check>
            }
        </Container>
    );
}

export default UserCard;
