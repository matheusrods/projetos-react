import React, { Fragment, useEffect, useState } from 'react';
import WhiteHeader from '../../../../../components/atoms/white-header';
import { useHistory, useParams } from 'react-router-dom';
import { Divisor, NextButton } from '../../../../../components/atoms';
import { LoadingContainer, ModalComplex } from '../../../../../components/molecules';
import { sleep } from '../../../../../utils/helpers';
import {
    Container,
    Content,
    Title,
    Subtitle,
    BodyTitle,
    BoxRowAround,
    CardTitle,
    CardText,
    Item
} from './styles';
import { FiTool } from 'react-icons/fi';

const audit = {
    id: 1,
    area: 'Produção',
    supportArea: 'Planejamento',
    product: 'Materiais/Produção',
    auditor: 'Renato Saldanha',
    location: 'Anhanguera',
    date: '14/04/2021',
    hour: '13h00 às  14h00',
    status: 'done',
    subProcess: 'Treinamento de parceiros e suporte técnico',
    requirements: [
        {
            id: 1,
            name: 'Requisitos ISO 9001:2015',
            topics: [
                {
                    '5.1.2': 'Foco no cliente'
                },
                {
                    7.1: 'Recursos'
                },
                {
                    7.2: 'Competência'
                },
                {
                    8.1: 'Planejamento e controle operacionais'
                },
                {
                    '8.2.1': 'Comunicação com o cliente'
                },
                {
                    '8.5.1': 'Controle de produção e de provisão de serviços'
                },
                {
                    8.6: 'Liberação de produtos e serviços'
                },
                {
                    9.1: 'Monitoramento, medição, análise e avaliação'
                },
                {
                    '9.1.2': 'Satisfação do cliente'
                },
                {
                    '9.1.3': 'Análise e avaliação'
                },
                {
                    10.3: 'Melhoria contínua'
                }
            ]
        },
        {
            id: 2,
            name: 'Requisitos ISO 14001:2015',
            topics: [
                {
                    5.2: 'Política'
                },
                {
                    '6.1.2': 'Aspectos ambientais'
                },
                {
                    7.2: 'Competência'
                },
                {
                    7.3: 'Conscientização'
                },
                {
                    7.4: 'Comunicação'
                },
                {
                    '7.5.3': 'Controle de informação documentada'
                },
                {
                    8.2: 'Preparação e resposta a emergências'
                }
            ]
        },
        {
            id: 3,
            name: 'Requisitos OHSAS 18001:2007',
            topics: [
                {
                    4.2: 'Política de SST'
                },
                {
                    '4.3.1':
                        'Identificação de perigos, avaliação de riscos e determinação de controles'
                },
                {
                    '4.3.3': 'Objetivos e programa(s)'
                },
                {
                    '4.4.2': 'Competência, treinamento e conscientização'
                },
                {
                    '4.4.4': 'Documentação'
                },
                {
                    '4.4.7': 'Prontidão e resposta a emergências'
                }
            ]
        }
    ]
};

function AuditPending() {
    const history = useHistory();
    // eslint-disable-next-line
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [currentAudit, setCurrentAudit] = useState(null);
    const [alertModalVisible, setAlertModalVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        setCurrentAudit(audit);
        sleep(700).then(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Fragment>
                <Container>
                    <WhiteHeader
                        title="Auditoria pendente"
                        onClose={() => history.goBack()}
                    />
                    <LoadingContainer />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Container>
                <Content>
                    <WhiteHeader
                        title="Auditoria pendente"
                        onClose={() => history.goBack()}
                    />
                    <Title>
                        Área de suporte: {audit?.supportArea ?? 'Não informado'}
                    </Title>
                    <Subtitle>
                        Revise as informações do escopo antes de iniciar o
                        processo de auditoria
                    </Subtitle>
                    <BodyTitle  onClick={() => setAlertModalVisible(true)}>Ver instruções e requisitos</BodyTitle>
                    <BoxRowAround>
                        <CardTitle>Localidade</CardTitle>
                        <CardText>
                            {audit?.location ?? 'Não informado'}
                        </CardText>
                    </BoxRowAround>
                    <Divisor margin="4px 0" />
                    <CardTitle>Subprocesso adicional</CardTitle>
                    <CardText>{audit?.subProcess ?? 'Não informado'}</CardText>
                    <Divisor margin="4px 0" />
                    <BoxRowAround>
                        <CardTitle>Auditor</CardTitle>
                        <CardText>{audit?.auditor ?? 'Não informado'}</CardText>
                    </BoxRowAround>
                    <Divisor margin="4px 0" />

                    {audit?.requirements?.map((req, index) => (
                        <Fragment key={index}>
                            <CardTitle margin="0px 0px 4px 0px">
                                {req?.name ?? 'Não informado'}
                            </CardTitle>
                            {req?.topics?.map((topic, index) => (
                                <Fragment key={index}>
                                    <Item>
                                        <CardTitle minWidth="35px">
                                            {Object.keys(topic)?.[0] ??
                                                'Não informado'}
                                        </CardTitle>
                                        <CardText>
                                            {Object.values(topic)?.[0] ??
                                                'Não informado'}
                                        </CardText>
                                    </Item>
                                    <Divisor margin="4px 0" />
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}
                </Content>
            </Container>
                <NextButton
                    nextLabel="Iniciar Auditoria"
                    onBack={() => history.goBack()}
                    onNext={() => alert('Não implementado')}
                />
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => setAlertModalVisible(false)}
                icon={<FiTool size={30} />}
                title={'Intruções e Requisitos'}
                description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
                confirmButtonLabel={'Voltar'}
                uniqueFooterButton={true}
            />
        </Fragment>
    );
}

export default AuditPending;
