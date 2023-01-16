import React, { Fragment, useEffect, useState } from 'react';
import WhiteHeader from '../../../../../components/atoms/white-header';
import { useHistory } from 'react-router-dom';
import { NextButton } from '../../../../../components/atoms';
import { ItemListLargeGroup, ItemListSmallGroup, ModalComplex } from '../../../../../components/molecules';
import {
    Container,
    Content,
    Title,
    Subtitle,
    BodyTitle
} from './styles';
import { FiTool } from 'react-icons/fi';
import { inject, observer } from 'mobx-react';
import { filterAuditableRequirements, getInstructionsRequirements } from '../../../../../services/transforms/audits';

function AuditPending({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const { programmingInEditing = null, resetAuditingVariables } = AuditProfileAuditorStore;

    const [fields, setFields] = useState([]);
    const [themes, setThemes] = useState([]);
    const [instructionsRequirements, setInstructionRequirements] = useState(null);

    const [alertModalVisible, setAlertModalVisible] = useState(false);

    useEffect(() => {
        if (!programmingInEditing) {
            history.push('/audit/profile-auditor');
            return;
        }

        const {
            unity = {},
            auditors = [],
            auditorsLabel = '',
            calendarDateFormatted = ''
        } = programmingInEditing;

        const fieldsFormatted = [
            {
                label: auditors.length > 1 ? 'Auditores' : 'Auditor',
                value: auditorsLabel
            },
            {
                label: 'Localidade',
                value: unity.fantasyName
            },
            {
                label: 'Data agendada',
                value: calendarDateFormatted
            }
        ];

        setFields(fieldsFormatted);
        setThemes(filterAuditableRequirements(programmingInEditing));
        setInstructionRequirements(getInstructionsRequirements(programmingInEditing));
    }, [programmingInEditing, history]);

    return (
        <Fragment>
            <Container>
                <WhiteHeader
                    title="Auditoria pendente"
                    onClose={history.goBack}
                />
                <Content>
                    <Title>
                        Área de atuação: {programmingInEditing?.areaDescription}
                    </Title>
                    <Subtitle>
                        Revise as informações do escopo antes de iniciar o
                        processo de auditoria
                    </Subtitle>
                    {instructionsRequirements &&
                        <BodyTitle onClick={() => setAlertModalVisible(true)}>
                            Ver instruções e requisitos
                        </BodyTitle>
                    }
                    <ItemListLargeGroup data={fields} />
                    <ItemListSmallGroup data={themes} />
                </Content>
                <NextButton
                    nextLabel="Iniciar Auditoria"
                    onBack={history.goBack}
                    onNext={() => {
                        resetAuditingVariables();
                        history.push('/audit/profile-auditor/start-audit');
                    }}
                    positionRelative={true}
                />
            </Container>
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => setAlertModalVisible(false)}
                icon={<FiTool size={30} />}
                title={'Instruções e Requisitos'}
                description={instructionsRequirements}
                confirmButtonLabel={'Voltar'}
                uniqueFooterButton={true}
            />
        </Fragment>
    );
}

export default inject('AuditProfileAuditorStore')(observer(AuditPending));
