import React from 'react';

import {
    Wrapper
} from './styles';
import colors from '../../../../../styles/colors';
import {ActionCard} from '../../../../../components/atoms';
import { inject, observer } from 'mobx-react';
import {useHistory} from "react-router-dom";

const PendingInspections = ({ HomeInspectionStore }) => {

    const { inspections, homePath } = HomeInspectionStore;
    const history = useHistory();

    return (
        <>
            {inspections['pending'].count > 0 ? (
                inspections['pending'].list.map((item, index) => {
                    return (
                        <Wrapper key={`${item.id}-${index}`}>
                            <ActionCard
                                notDetailsButton={true}
                                backgroundColor={colors.shape}
                                action={item}
                                onClickDetails={() => history.push(`${homePath}/inspection/${item.inspectionId}`)}
                                DetailsButtonLabel={'Ver detalhes'}
                                notDetailsButton={false}
                            />
                        </Wrapper>
                    )
                })
            ) : (
                <>
                    Nenuma pendência em inspeções.
                </>
            )}

        </>
    );
};

export default inject('HomeInspectionStore')(observer(PendingInspections));

