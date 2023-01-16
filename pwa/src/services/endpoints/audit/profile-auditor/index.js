import { api } from '../../../api';
import { toast } from 'react-toastify';

async function getProgrammingAudits(unityId = null) {
    try {
        const query = `?codigo_unidade=${unityId}`;

        const response = await api.get(`/auditoria/programacoes/auditor${query}`);

        const { result: { data }, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        return { data, error: false };
    } catch (error) {
        toast.error('Falha ao buscar auditorias');

        return { data: {}, error: true };
    }
};

async function postAnnotationsProgrammingAudit(programmingAuditId = null, annotations = []) {
    try {
        if (!programmingAuditId || annotations.length === 0) {
            throw new Error('É obrigatório ter o id da auditoria de programação e pelo menos uma anotação');
        }

        const requestData = {
            codigo_auditoria_programacao: programmingAuditId,
            anotacoes: annotations.map(annotation => ({
                titulo: annotation.title,
                descricao: annotation.description,
                arquivo: annotation.image
            }))
        };

        const response = await api.post('/auditoria/programacoes/auditor/adicionar-anotacoes', requestData);

        const { result: { data }, status } = response.data;

        if (status !== 200 && status !== 201) {
            throw new Error('Ocorreu um erro na requisição');
        }

        toast.success(
            annotations.length > 1
                ? 'Anotações adicionadas com sucesso'
                : 'Anotação adicionada com sucesso'
        );

        return { data, error: false };
    } catch (error) {
        toast.error('Falha ao adicionar anotações');

        return { data: [], error: true };
    }
};

async function postPointedRequirementsThemeAudited(requestData, userType = 'auditor') {
    try {
        const response = await api.post(`/auditoria/programacoes/${userType}/adicionar-tratativa-ncom`, requestData);

        const { result, status } = response.data;

        if ((status !== 200 && status !== 201) || result?.data?.error) {
            throw new Error('Ocorreu um erro na requisição');
        }

        toast.success('Tratativa enviada com sucesso!');

        return { data: result?.data || [], error: false };
    } catch (error) {
        toast.error('Falha ao enviar tratativa');

        return { data: [], error: true };
    }
};

async function postRequirementsThemeAudited(programmingAuditId = null, theme = null, criticalities = []) {
    try {
        if (!programmingAuditId || !theme) {
            throw new Error('É obrigatório ter o id da auditoria de programação e o tema auditado');
        }

        const { titles = [] } = theme;

        const requirementsAudited = [];

        titles.forEach(title => {
            const { requirements = [] } = title;

            requirements.forEach(requirement => {
                const { id, status, answers, photos } = requirement;

                const classifications = [];

                switch (status) {
                    case 1:
                        classifications.push({
                            codigo_pos_criticidade: null,
                            classificacao_nao_conformidade: null,
                            descricao_evidencias: answers?.conformed?.evidence,
                            descricao_oportunidade_melhorias: answers?.conformed?.opportunityImprovement || null
                        });
                        break;
                    case 2:
                        answers.unConformities.forEach(unConform => {
                            const criticality = criticalities.find(criticality => {
                                return criticality.values.includes(unConform?.criticality);
                            });

                            classifications.push({
                                codigo_pos_criticidade: criticality?.id,
                                classificacao_nao_conformidade: unConform?.classification,
                                descricao_evidencias: unConform?.evidence,
                                descricao_oportunidade_melhorias: unConform?.opportunityImprovement || null
                            });
                        });

                        break;
                    case 3:
                        classifications.push({
                            codigo_pos_criticidade: null,
                            classificacao_nao_conformidade: null,
                            descricao_evidencias: answers?.notApplicable?.evidence,
                            descricao_oportunidade_melhorias: null
                        });
                        break;
                    default:
                        break;
                }

                requirementsAudited.push({
                    codigo_auditoria_tema_requisito: id,
                    status: status,
                    classificacoes: classifications,
                    fotos: photos.map(photo => ({
                        arquivo: photo
                    }))
                });
            });
        });

        const requestData = {
            codigo_auditoria_programacao: programmingAuditId,
            temas_auditados: [
                {
                    codigo_auditoria_tema: theme?.id,
                    requisitos_auditados: requirementsAudited,
                    vinculo_anotacoes: theme?.annotations?.map(annotation => ({
                        codigo_auditoria_programacao_anotacao: annotation
                    })) || []
                }
            ]
        };

        const response = await api.post('/auditoria/programacoes/auditor/adicionar-requisitos-auditados', requestData);

        const { result, status } = response.data;

        if ((status !== 200 && status !== 201) || result?.data?.error) {
            throw new Error('Ocorreu um erro na requisição');
        }

        toast.success('Requisitos auditados enviados com sucesso!');

        return { data: result?.data || [], error: false };
    } catch (error) {
        toast.error('Falha ao enviar os requisitos auditados');

        return { data: [], error: true };
    }
};

export {
    getProgrammingAudits,
    postAnnotationsProgrammingAudit,
    postRequirementsThemeAudited,
    postPointedRequirementsThemeAudited
};
