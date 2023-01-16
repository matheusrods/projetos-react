import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaRegEye, FaWrench, FaSearch } from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';
import { RiFootprintFill } from 'react-icons/ri';
import { LoadingContainer } from '../../components/molecules';
import Header from '../../components/organisms/header';
import { wantToSeeCount } from '../../services/endpoints/pos';
import colors from '../../styles/colors';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardIcon,
    CardTitle,
    Container,
    Counter,
    StyledLink,
    Title
} from './styles';

function WantToSee({
    PermissionStore: { haveAtLeastOnePermission },
    ProfileStore: { haveAtLeastOneProfile },
    HomeInspectionStore: { getArrayInspectionProfiles, getHomeCardTitle }
}) {
    const [count, setCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [isVisibleCardAudit, setIsVisibleCardAudit] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const count = await wantToSeeCount();

            if (count) {
                setCount(count);
            }

            setLoading(false);
        };

        getData();
    }, []);

    const urlAuditByPermissionUser = () => {
        if (haveAtLeastOnePermission([23, 24, 25, 26])) {
            return '/audit/ses';
        } else if (haveAtLeastOnePermission([27, 28, 29, 30])) {
            return '/audit/head-quality';
        } else if (haveAtLeastOnePermission([31, 32, 33, 34, 35])) {
            return '/audit/profile-auditor';
        } else if (haveAtLeastOnePermission([36])) {
            return '/audit/responsible-dealt';
        } else if (haveAtLeastOnePermission([37])) {
            return '/audit/responsible-process';
        } else {
            setIsVisibleCardAudit(false);
            return '/want-to-see';
        }
    };

    return (
        <>
            <Header />
            <Container>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <>
                        <Title>O que você quer ver?</Title>
                        {/* {isVisibleCardAudit ? (
                            <Card borderColor={colors.purple}>
                                <CardHeader>
                                    <CardContent>
                                        <CardIcon>
                                            <FaSearch
                                                size={16}
                                                color={colors.purple}
                                            />
                                        </CardIcon>
                                        <CardTitle>Auditoria</CardTitle>
                                        {<Counter>{count?.actionPlan}</Counter>}
                                    </CardContent>
                                </CardHeader>
                                <CardFooter>
                                    <StyledLink to={urlAuditByPermissionUser()}>
                                        Ver Registros
                                    </StyledLink>
                                    <FaAngleRight />
                                </CardFooter>
                            </Card>
                        ) : null} */}

                        <Card borderColor={colors.redAux}>
                            <CardHeader>
                                <CardContent>
                                    <CardIcon rotate={90}>
                                        <RiFootprintFill
                                            color={colors.redAux}
                                        />
                                    </CardIcon>
                                    <CardTitle>EHS Walk & Talk</CardTitle>
                                    <Counter>{count?.swt}</Counter>
                                </CardContent>
                            </CardHeader>
                            <CardFooter>
                                <StyledLink to={'/safety-walk-talk'}>
                                    Ver Registros
                                </StyledLink>
                                <FaAngleRight />
                            </CardFooter>
                        </Card>
                        <Card borderColor={colors.mechanicalDangerBlue}>
                            <CardHeader>
                                <CardContent>
                                    <CardIcon>
                                        <FaRegEye
                                            color={colors.mechanicalDangerBlue}
                                        />
                                    </CardIcon>
                                    <CardTitle>Observador EHS</CardTitle>
                                    <Counter>{count?.observer}</Counter>
                                </CardContent>
                            </CardHeader>
                            <CardFooter>
                                <StyledLink to={'/observer-ehs'}>
                                    Ver Registros
                                </StyledLink>
                                <FaAngleRight />
                            </CardFooter>
                        </Card>

                        <Card borderColor={colors.environmentDangerGreen}>
                            <CardHeader>
                                <CardContent>
                                    <CardIcon>
                                        <FaWrench
                                            size={16}
                                            color={
                                                colors.environmentDangerGreen
                                            }
                                        />
                                    </CardIcon>
                                    <CardTitle>Plano de Ação</CardTitle>
                                    <Counter>{count?.actionPlan}</Counter>
                                </CardContent>
                            </CardHeader>
                            <CardFooter>
                                <StyledLink to={'/action-plan'}>
                                    Ver Registros
                                </StyledLink>
                                <FaAngleRight />
                            </CardFooter>
                        </Card>

                        {/* <Card borderColor={colors.orange2}>
                            <CardHeader>
                                <CardContent>
                                    <CardIcon>
                                        <FaWrench
                                            size={16}
                                            color={
                                                colors.environmentDangerGreen
                                            }
                                        />
                                    </CardIcon>
                                    <CardTitle>
                                        Treinamentos e Competências
                                    </CardTitle>
                                    <Counter>{count?.actionPlan}</Counter>
                                </CardContent>
                            </CardHeader>
                            <CardFooter>
                                <StyledLink to={'/training'}>
                                    Ver Registros
                                </StyledLink>
                                <FaAngleRight />
                            </CardFooter>
                        </Card> */}

                        {/* {haveAtLeastOneProfile(
                            getArrayInspectionProfiles()
                        ) && (
                            <Card borderColor={colors.environmentDangerGreen}>
                                <CardHeader>
                                    <CardContent>
                                        <CardIcon>
                                            <FiShield
                                                color={
                                                    colors.environmentDangerGreen
                                                }
                                            />
                                        </CardIcon>
                                        <CardTitle>
                                            {getHomeCardTitle()}
                                        </CardTitle>
                                        <Counter>
                                            {count?.inspections || 0}
                                        </Counter>
                                    </CardContent>
                                </CardHeader>
                                <CardFooter>
                                    <StyledLink to={'/inspection-assessment'}>
                                        Ver Registros
                                    </StyledLink>
                                    <FaAngleRight />
                                </CardFooter>
                            </Card>
                        )} */}
                    </>
                )}
            </Container>
        </>
    );
}

export default inject(
    'PermissionStore',
    'ProfileStore',
    'HomeInspectionStore'
)(observer(WantToSee));
