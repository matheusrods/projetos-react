import { inject, observer } from 'mobx-react';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FaCheck, FaHome } from 'react-icons/fa';
import { useHistory } from 'react-router';
import {
    NextButton,
    SingleNextButton,
    WhiteHeaderBack
} from '../../../../../components/atoms';
import { CompletionSuccess } from '../../../../../components/molecules';
import { ContainerList } from '../../../../../components/molecules/items-list-large-group/styles';
import ItemListLargeGroup from '../../../../../components/molecules/items-list-large-group';
import ItemListSmallGroup from '../../../../../components/molecules/items-list-small-group';
import { filterRequirementsByProcess } from '../../../../../services/transforms/audits';
import { create } from '../../../../../services/endpoints/audit/ses/create';

import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle,
    ContainerContent,
    ContainerSuccess
} from './styles';

const ResumeAuditNew = ({ NewAudit, location }) => {
    const history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [themes, setThemes] = useState([]);
    const [areas, setAreas] = useState([]);

    const originalPage = location?.location?.state?.originalPage ?? 'ses';
    const formattedAudits = location?.state?.audits;

    const {
        getSelectedAreas,
        getSelectedLocaleName,
        getSelectedBusName,
        getSelectedOpcoName,
        getSelectedRequirements
    } = NewAudit;

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            formattedAudits.map(async (audit) => {
                await create(audit);
            })

            setLoadingSubmit(false);
            toast.success('Programações criadas com sucesso!');
            setCompleted(true);
        } catch (error) {
            setLoadingSubmit(false);
            return;
        }
    };


    useEffect(() => {
        setThemes(filterRequirementsByProcess(getSelectedRequirements()));
        setAreas(getSelectedAreas());
    }, [getSelectedRequirements, getSelectedAreas]);


    const infos = [
        {
            label: 'Unidade',
            value: getSelectedLocaleName() ?? history.push('/audit/new-audit')
        },
        {
            label: 'Business Unit',
            value: getSelectedBusName() ?? 'Não informado'
        },
        {
            label: 'OPCO',
            value: getSelectedOpcoName() ?? 'Não informado'
        },
    ];

    if (completed) {
        return (
            <ContainerSuccess>
                <ContainerContent>
                    <CompletionSuccess
                        title={
                            originalPage !== 'hq'
                                ? 'Programação de auditoria finalizada com sucesso!'
                                : 'Programação de auditoria reagendada com sucesso!'
                        }
                        description={
                            'Você será redirecionado para a tela inicial'
                        }
                        redirectTime={5000}
                        fullscreen={completed}
                        redirectTo={() => {
                            if (originalPage === 'ses') {
                                history.push('/audit/ses');
                                NewAudit.reset();
                            } else if (originalPage === 'hq') {
                                history.push('/audit/head-quality');
                            } else {
                                history.push('/audit/ses');
                                NewAudit.reset();
                            }
                        }}
                    />
                </ContainerContent>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => {
                        if (originalPage === 'ses') {
                            history.push('/audit/ses');
                            NewAudit.reset();
                        } else if (originalPage === 'hq') {
                            history.push('/audit/head-quality');
                        } else {
                            history.push('/audit/ses');
                            NewAudit.reset();
                        }
                    }}
                    nextLabel={'Ir para início'}
                    icon={<FaHome />}
                />
            </ContainerSuccess>
        );
    } else {
        return (
            <>
                <WhiteHeaderBack
                    title={'Programação de Auditoria'}
                    onBack={() => history.goBack()}
                />
                <Container>
                    <ContainerContent>
                        <ContainerHeader>
                            <ContainerHeaderTitle>
                                {areas === 1 ? 'Área' : 'Áreas'} de atuação: {areas?.map(area => area.name).join(", ")}
                            </ContainerHeaderTitle>
                            <ContainerHeaderSubTitle>
                                Revise as informações do escopo antes de
                                confirmar a auditoria
                            </ContainerHeaderSubTitle>
                        </ContainerHeader>
                        <ContainerList>
                            <ItemListLargeGroup data={infos} />
                            <ItemListSmallGroup data={themes} />
                        </ContainerList>
                    </ContainerContent>
                    <NextButton
                        positionRelative={true}
                        nextDisabled={loading || loadingSubmit}
                        loading={loadingSubmit}
                        onBack={() => history.goBack()}
                        onNext={() => handleSubmit()}
                        icon={<FaCheck />}
                        nextLabel={'Finalizar'}
                    />
                </Container>
            </>
        );
    }
};

export default inject('NewAudit')(observer(ResumeAuditNew));
