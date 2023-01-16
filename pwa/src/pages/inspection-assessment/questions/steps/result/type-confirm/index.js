import React, {useEffect, useState} from 'react';

import {
    Container, Grid,
    PageTitle, Wrapper,
} from './styles';
import {useLocation} from "react-router-dom";
import {InlineLabelValue, ShapeCard} from "../../../../../../components/atoms";

import CardConfomity from "../../../../../../components/molecules/card-confomity";
import {CardPercent, CardTitleValue} from "../../../../../../components/molecules";
import {BsDot} from "react-icons/all";
import colors from "../../../../../../styles/colors";

const TypeConfirm = ({
    inspection,
    form
}) => {
    const location = useLocation();
    const [conformity, setConformity] = useState({value: 0, total: 0});
    const [attendance, setAttendance] = useState(0);

    useEffect(() => {
        if (form.conform) {
            const conformity = form.conform.split('/');
            setConformity({
                value: conformity[0],
                total: conformity[1]
            });
            setAttendance(form.attendance);

        }
    }, [form]);

    return (
        <Container key={location.key}>
            <PageTitle>Total da verificação</PageTitle>
            <Wrapper>
                <CardTitleValue
                    title="Status da Inspeção"
                    subtitle={inspection.validity}
                    value={form.sightDescription}
                    icon={<BsDot size={40} color={colors.orange2}/>}
                />
            </Wrapper>


            <Grid>
                <CardConfomity
                    value={conformity.value}
                    total={conformity.total}
                />
                <CardPercent
                    percent={attendance}
                />
            </Grid>

            <ShapeCard>
                <InlineLabelValue
                    label={'Inspeção'}
                    value={inspection.name}
                />
                <InlineLabelValue
                    label={'Responsável'}
                    value={inspection.responsibleName}
                />
                <InlineLabelValue
                    label={'Parecer'}
                    value={form.sightDescription}
                />

            </ShapeCard>
        </Container>
    );
};

export default TypeConfirm;
