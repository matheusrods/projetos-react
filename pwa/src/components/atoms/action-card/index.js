import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

// Card types
import Default from './default';
import ScopeAnalysis from './scope-analysis';

function ActionCard({
    action,
    linkObservedItem = false,
    backgroundColor,
    showOptions = false,
    showSelected = false,
    showStatusInline = false,
    selected = false,
    onClickOptions,
    onClickDetails = () => { },
    DetailsButtonLabel = 'Detalhes',
    notDetailsButton,
    cardType = 'default',
    ...rest
}) {
    const renderCard = () => {
        switch (cardType) {
            case 'default':
                return (
                    <Default
                        linkObservedItem={linkObservedItem.name}
                        action={action}
                        showSelected={showSelected}
                        showStatusInline={showStatusInline}
                        notDetailsButton={notDetailsButton}
                        onClickDetails={onClickDetails}
                        detailsButtonLabel={DetailsButtonLabel}
                        selected={selected}
                        showOptions={showOptions}
                        onClickOptions={onClickOptions}
                    />
                );
            case 'scope-analysis':
                return (
                    <ScopeAnalysis
                        action={action}
                        showSelected={showSelected}
                        showStatusInline={showStatusInline}
                        notDetailsButton={notDetailsButton}
                        onClickDetails={onClickDetails}
                        detailsButtonLabel={DetailsButtonLabel}
                        selected={selected}
                        showOptions={showOptions}
                        onClickOptions={onClickOptions}
                    />
                );
            default:
                break;
        }
    };

    return (
        <Container
            backgroundColor={backgroundColor}
            cursorType={!!notDetailsButton}
            {...rest}
        >
            {renderCard()}
        </Container>
    );
}

ActionCard.propTypes = {
    action: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        status: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            color: PropTypes.string
        }),
        criticism: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            color: PropTypes.string
        }),
        origin: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string
        }),
        type: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string
        }),
        observedItem: PropTypes.string,
        responsible: PropTypes.shape({
            name: PropTypes.string
        }),
        deadline: PropTypes.string,
        reopened: PropTypes.bool,
        daysToExpire: PropTypes.number,
        daysLate: PropTypes.number,
        location: PropTypes.shape({
            fullAddress: PropTypes.string
        }),
        description: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired,
    backgroundColor: PropTypes.string,
    notDetailsButton: PropTypes.bool
};

export default ActionCard;
