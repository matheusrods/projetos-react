import React, { Fragment } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { CompanyHeader, SingleNextButton } from '../../../../components/atoms';
import { Header } from '../../../../components/organisms';
import colors from '../../../../styles/colors';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    PerceptionIndex,
    PerceptionIcon,
    PerceptionTitle,
    PerceptionValue,
    Wrapper,
    Label,
    Value,
    PerceptionWrapper
} from './styles';

const NewRegisterPerceptionIndex = ({ location: { state } }) => {
    const history = useHistory();
    const { content, result } = state;

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => history.push('/safety-walk-talk')}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Índice de percepção (IP)</PageTitle>
                        <PageDescription>{content.subtitle}</PageDescription>
                    </PageInfo>
                    <PerceptionIndex>
                        <PerceptionWrapper>
                            <PerceptionIcon>
                                <FaCheck size={26} color={colors.client} />
                            </PerceptionIcon>
                            <PerceptionTitle>{content.title}</PerceptionTitle>
                            <PerceptionValue>
                                {result.resultQualification}
                            </PerceptionValue>
                        </PerceptionWrapper>
                        <Wrapper>
                            <div>
                                <Label>MÉDIA DA ÁREA</Label>
                                <Value>{result.averageArea}</Value>
                            </div>
                            <div>
                                <Label>MÉDIA DA EMPRESA</Label>
                                <Value>{result.averageClient}</Value>
                            </div>
                        </Wrapper>
                    </PerceptionIndex>
                </Content>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => {
                        history.push('/safety-walk-talk');
                    }}
                    nextLabel={'Ir para início'}
                />
            </Container>
        </Fragment>
    );
};

export default NewRegisterPerceptionIndex;
