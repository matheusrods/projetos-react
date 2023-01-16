import React, { Fragment } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { WhiteHeaderBack } from '../../../../../components/atoms';
import {
    Container,
    CardContainer,
    ContainerItem,
    Label,
    ContainerItemColumn,
    LabelCriticism,
    ValueCriticism,
    ContainerButton,
    LinkAction
} from './styles';
import { FaAngleRight } from 'react-icons/fa';

function AuditNCOMPrevious() {
    const history = useHistory();

    const { deals = [] } = history.location.state;

    return deals.length > 0 ? (
        <Fragment>
            <WhiteHeaderBack
                title={'NC/OM Anteriores'}
                onBack={history.goBack}
            />
            <Container>
                {deals.map((item, index) => {
                    return (
                        <CardContainer
                            key={index}
                            onClick={() =>
                                history.push('ncom-previous/details', {
                                    dealt: item
                                })
                            }
                        >
                            <ContainerItem>
                                <Label>{item.themeTitle}</Label>
                            </ContainerItem>
                            <ContainerItemColumn>
                                <LabelCriticism>
                                    #{item.id}
                                </LabelCriticism>
                                <ValueCriticism>
                                    {item.orderLabel} {item.requirementTitle}
                                </ValueCriticism>
                            </ContainerItemColumn>
                            <ContainerButton>
                                <LinkAction>
                                    Ver detalhes <FaAngleRight />
                                </LinkAction>
                            </ContainerButton>
                        </CardContainer>
                    );
                })}
            </Container>
        </Fragment>
    ) : <Redirect to="/audit/profile-auditor" />;
}

export default AuditNCOMPrevious;
