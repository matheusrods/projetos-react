import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts'

import {
    Container, Grid,
    PageTitle,
    WrapperCenter
} from './styles';
import {useLocation} from "react-router-dom";
import {InlineLabelValue, ShapeCard} from "../../../../../../components/atoms";
import colors from "../../../../../../styles/colors";
import CardConfomity from "../../../../../../components/molecules/card-confomity";
import {CardPercent} from "../../../../../../components/molecules";

const TypeConformity = ({
    inspection,
    form
}) => {
    const location = useLocation();
    const [conformity, setConformity] = useState({value: 0, total: 0});
    const [attendance, setAttendance] = useState(0);
    const [serieChart, setSerieChart] = useState([0,0,0,0]);
    const [showChart, setShowChart] = useState(false);
    const [chart] = useState({
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Menor', 'Média', 'Alta', 'Maior'],
            colors: [colors.greenAux, colors.inspectionsProgress, colors.orange2, colors.redAux],

        },
    });
    useEffect(() => {
        if (form.conform) {
            const conformity = form.conform.split('/');
            setConformity({
                value: conformity[0],
                total: conformity[1]
            });
            setAttendance(form.attendance);
            const naoConformidade = form.answers.filter(answer => answer.conform === 0);
            let serie = [0,0,0,0];
            for(const item of naoConformidade){
                serie[item.criticism - 1] += 1;
            }
            setSerieChart(serie);
            if(naoConformidade.length > 0){
                setShowChart(true);
            }
        }
    }, [form]);

    return (
        <Container key={location.key}>
            <PageTitle>Total da verificação</PageTitle>
            <Grid>
                <CardConfomity
                    value={conformity.value}
                    total={conformity.total}
                />
                <CardPercent
                    percent={attendance}
                />
            </Grid>

            {showChart &&
                <WrapperCenter>
                    <Chart
                        options={chart.options}
                        series={serieChart}
                        type="donut"
                        width={380}
                    />
                </WrapperCenter>
            }

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

export default TypeConformity;
