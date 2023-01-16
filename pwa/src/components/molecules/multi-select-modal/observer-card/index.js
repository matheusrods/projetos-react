import React from 'react';
import {
    FaCheck, FaExclamationCircle,
    // FaExclamationCircle
} from 'react-icons/fa';
import { Container, Row, Column, Check } from './styles';

const ObserverCard = ({
    id,
    status = {},
    location,
    user = {},
    criticism = {},
    date,
    observationType,
    selected,
    onPress,
    ...rest
}) => {
    return (
        <Container type={'button'} onClick={onPress} {...rest} statusColor={status.color} criticismColor={criticism?.color}>
            <Row padding={'0px 0px 12px'} borderBottom={true} alignItems={'flex-start'}>
                <Column>
                    <span className={'observer__title'}>Observação</span>
                    <span className={'observer__id'}>#{id}</span>
                </Column>
                <Check selected={selected}>
                    {selected && <FaCheck />}
                </Check>
            </Row>
            <Row padding={'8px 0px'} borderBottom={true}>
                <span className={'observer__label'}>Status</span>
                <span className={'observer__status'}>{status.label}</span>
            </Row>
            <Row padding={'12px 0px'} borderBottom={true}>
                <Column>
                    <span className={'observer__location-title'}>{observationType}</span>
                    <span className={'observer__location'}>{location}</span>
                </Column>
            </Row>
            {criticism?.id &&
                <Row padding={'12px 0px'} borderBottom={true}>
                    <span className={'observer__label'}>
                        <FaExclamationCircle />
                        Criticidade
                    </span>
                    <span className={'observer__risk-level'}>{criticism?.description}</span>
                </Row>
            }
            <Row padding={'8px 0px 0px'} justifyContent={'flex-start'}>
                <div className={'observer__avatar'}>
                    {user?.avatar ? <img src={user.avatar} alt={'user'} /> : user?.name ? user.name[0] : '-'}
                </div>
                <Column>
                    <span className={'observer__user'}>{user.name}</span>
                    <span className={'observer__date'}>{date}</span>
                </Column>
            </Row>
        </Container>
    );
}

export default ObserverCard;
