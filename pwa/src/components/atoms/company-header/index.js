import { inject, observer } from 'mobx-react';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import {
    Container,
    CompanyName,
    TypeAction,
    ActionInformation,
    RightAction,
    CloseButton
} from './styles';

const CompanyHeader = ({
    typeAction,
    onClose,
    positionRelative,
    UserStore: { userCompany: { fantasyName } }
}) => {
    return (
        <Container positionRelative={positionRelative}>
            <ActionInformation>
                <CompanyName>{fantasyName}</CompanyName>
                <TypeAction>{typeAction}</TypeAction>
            </ActionInformation>
            {typeof onClose === 'function' &&
                <RightAction>
                    <CloseButton aria-label={'Fechar'} onClick={onClose}>
                        <FaTimes />
                    </CloseButton>
                </RightAction>
            }
        </Container>
    );
}

export default inject('UserStore')(observer(CompanyHeader));
