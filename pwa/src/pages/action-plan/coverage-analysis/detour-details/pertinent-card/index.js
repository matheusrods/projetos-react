import _ from 'lodash';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import {
    Container,
    Info,
    IdLabel,
    IdValue,
    Label,
    Description,
    ContainerActions,
    Button,
    LinkDetails,
    User,
    UserInfo,
    Date,
    Avatar,
    UserName,
    Footer
} from './styles';

const PertinentCard = ({ item, onConfirm, onDeny, onLink, isComprehensive }) => {
    return (
        <Container>
            <Info flexDirection={'column'}>
                <IdLabel>Id ação</IdLabel>
                <IdValue>#{item?.id}</IdValue>
            </Info>
            <Info>
                <Label>Tipo da ação</Label>
                <Description>{item?.type?.description}</Description>
            </Info>
            <Info flexDirection={'column-padding'}>
                <Label>Descrição da ação</Label>
                <Description>{item?.description}</Description>
            </Info>
            <Info>
                <User>
                    <Avatar>
                        {item?.user?.avatar ? <img src={item.user.avatar} alt={"user"} /> : item?.user?.name ? item.user.name[0] : '-'}
                    </Avatar>
                    <UserInfo>
                        <UserName>{item?.user?.name}</UserName>
                        <Date>{item?.registrationDate}</Date>
                    </UserInfo>
                </User>
                <LinkDetails onClick={() => onLink()}>
                    Detalhes
                    <FaAngleRight />
                </LinkDetails>
            </Info>
            {!_.isNull(isComprehensive) && (
                <Info noBorderBottom={true}>
                    <Label>Ação é abrangente?</Label>
                    <Description>{isComprehensive === true ? 'Sim' : 'Não'}</Description>
                </Info>
            )}
            {_.isNull(isComprehensive) && (
                <Footer>
                    <Label>Análise de abrangência</Label>
                    <Description>
                        Você considera esta ação pertinente para as suas áreas de atuação?
                        </Description>
                    <ContainerActions>
                        <Button onClick={() => onDeny()}>Não</Button>
                        <Button onClick={() => onConfirm()}>Sim</Button>
                    </ContainerActions>
                </Footer>
            )}
        </Container>
    );
}

export default PertinentCard;
