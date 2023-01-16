import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { NextButton, WhiteHeaderBack } from '../../../../../components/atoms';

import {
    Container,
    Content,
    Label,
    ContainerInput,
    TextArea,
    ContainerContent
} from './styles';

const ResponsibleDealtInvestigationCause = ({ Auditing }) => {
    const history = useHistory();

    const { unConformityRequirement = null, dealInEditing, setDealInEditing } = Auditing;

    const handleSubmit = () => history.push('actions');

    return unConformityRequirement ? (
        <>
            <WhiteHeaderBack
                title={'Tratativa de NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                <ContainerContent>
                    <Content>
                        <ContainerInput>
                            <Label htmlFor={'investigation-cause'}>
                                Investigação da Causa Raiz (Análise
                                cuidadosa do problema para definição da
                                Causa Raiz) ou Objetivos das Ações (Ação
                                Preventiva ou Ação de Melhoria)
                            </Label>
                            <TextArea
                                id={'investigation-cause'}
                                placeholder={'a) Escreva a Análise da Causa / Definição da Causa Raiz / Objetivos das Ações'}
                                onChange={({ target: { value } }) =>
                                    setDealInEditing({ textInvestigation: value })
                                }
                                value={dealInEditing?.textInvestigation}
                            ></TextArea>
                        </ContainerInput>
                    </Content>
                </ContainerContent>
                <NextButton
                    positionRelative={true}
                    nextDisabled={dealInEditing?.textInvestigation === '' || !dealInEditing?.textInvestigation}
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
        </>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
};

export default inject('Auditing')(
    observer(ResponsibleDealtInvestigationCause)
);
