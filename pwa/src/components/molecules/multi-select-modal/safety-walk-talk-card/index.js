import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Container, Row, Column, Check } from './styles';

const SafetyWalkTalkCard = ({
    id,
    status = {},
    location,
    user = {},
    date,
    selected,
    onPress,
    ...rest
}) => {
    return (
        <Container type={'button'} onClick={onPress} {...rest} statusColor={status.color}>
            <Row padding={'0px 0px 12px'} borderBottom={true} alignItems={'flex-start'}>
                <Column>
                    <span className={'safety-walk-talk__title'}>Safety Walk & Talk</span>
                    <span className={'safety-walk-talk__id'}>#{id}</span>
                </Column>
                <Check selected={selected}>
                    {selected && <FaCheck />}
                </Check>
            </Row>
            <Row padding={'8px 0px'} borderBottom={true}>
                <span className={'safety-walk-talk__label'}>Status</span>
                <span className={'safety-walk-talk__status'}>{status.label}</span>
            </Row>
            <Row padding={'12px 0px'} borderBottom={true}>
                <Column>
                    <span className={'safety-walk-talk__location-title'}>Safety Walk & Talk</span>
                    <span className={'safety-walk-talk__location'}>{location}</span>
                </Column>
            </Row>
            <Row padding={'8px 0px 0px'} justifyContent={'flex-start'}>
                <div className={'safety-walk-talk__avatar'}>
                    {user?.avatar ? <img src={user.avatar} alt={'user'} /> : user?.name ? user.name[0] : '-'}
                </div>
                <Column>
                    <span className={'safety-walk-talk__user'}>{user.name}</span>
                    <span className={'safety-walk-talk__date'}>{date}</span>
                </Column>
            </Row>
        </Container>
    );
}

export default SafetyWalkTalkCard;
