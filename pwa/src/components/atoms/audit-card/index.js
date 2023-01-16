import React from 'react';
import ItemListLargeGroupInCard from '../../../components/molecules/items-list-large-group-in-card';

import {
    CardContainer,
    Infos,
    Title,
    Type,
    ContainerButtons,
    Button,
    Icon,
    ContainerList,
    ContainerRequirements,
    SubTitle,
    Id,
    Description
} from './styles';

const AuditCard = ({
    backgroundColor,
    borderColor,
    onClick,
    title,
    type,
    textButton,
    iconButton,
    listItems,
    requirements
}) => {
    return (
        <CardContainer
            onClick={onClick}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
        >
            {
                title ?
                <Infos>
                    <Title>{title}</Title>
                    <Type>{type}</Type>
                </Infos>
                : null
            }
            {listItems ? (
                <ContainerList>
                    <ItemListLargeGroupInCard data={listItems} />
                </ContainerList>
            ) : null}
            {requirements?.map((item, index) => {
                return (
                    <ContainerRequirements key={index}>
                        <SubTitle>{item.title}</SubTitle>
                        <Id>ID #{item.id}</Id>
                        <Description>{item.description}</Description>
                    </ContainerRequirements>
                );
            })}
            <ContainerButtons>
                <Button>
                    {textButton}
                    <Icon>{iconButton}</Icon>
                </Button>
            </ContainerButtons>
        </CardContainer>
    );
};

export default AuditCard;
