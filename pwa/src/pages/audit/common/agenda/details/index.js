import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import NavbarFooter from "../../../../../components/organisms/navbarFooter";
import {
    WhiteHeaderBack
} from '../../../../../components/atoms';
import {
    LoadingContainer
} from '../../../../../components/molecules';
import ItemListLarge from '../../../../../components/atoms/item-list-large'
import ItemListSmallGroup from '../../../../../components/molecules/items-list-small-group';
import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle
} from './styles';
import { ContainerList } from '../../../../../components/molecules/items-list-large-group/styles';
import { 
    ContainerRequirements
} from '../../../../../components/molecules/items-list-small-group/styles';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';


const AuditDetails = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [audit] = useState(history.location?.state?.audit || []);
    const [date] = useState(history.location?.state?.date || []);
    const [selectedFilters] = useState(history.location?.state?.selectedFilters || []);
    const [themes, setThemes] = useState([]);
    

    useEffect(() => {
        const getStore = async () => {
            setLoading(false);
        };

        getStore();

        setThemes(filterAuditableRequirements(audit));
    }, [audit]);

    return (
        <>
            <WhiteHeaderBack
                title={'Programação de Auditoria'}
                onBack={() => history.push({
                    pathname: `agenda`,
                    state: {
                        date: date,
                        selectedFilters: selectedFilters
                    }
                })}
            />

            <Container>
                { loading ? (
                    <LoadingContainer />
                ) : (
                    <>
                        <ContainerHeader>
                            <ContainerHeaderTitle>
                                Área de atuação: {audit?.areaDescription}
                            </ContainerHeaderTitle>
                            <ContainerHeaderSubTitle>
                                Revise as informações do escopo antes de
                                confirmar a auditoria
                            </ContainerHeaderSubTitle>
                        </ContainerHeader>

                        <ContainerList>
                            <ItemListLarge 
                                label={audit?.auditors?.length > 1 ? 'Auditores' : 'Auditor'}
                                value={audit?.auditorsLabel}
                            />
                            <ItemListLarge 
                                label="Localidade"
                                value={audit?.unity?.fantasyName}
                            />
                            <ItemListLarge
                                label="Data agendada"
                                value={audit?.calendarDateFormatted}
                            />
                        </ContainerList>

                        <ContainerRequirements>
                            <ItemListSmallGroup 
                                data={themes}
                            />
                        </ContainerRequirements>
                    </>
                )}
                <NavbarFooter
                    active={3}
                />
            </Container>
        </>
    );
};

export default AuditDetails;
