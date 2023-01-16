import React from 'react';

import {
    Body,
    Container,
    Content,
    PageTitle,
} from './styles';
import {CompanyHeader, TextAreaDefault} from '../../atoms';

import BottomNavigationButton from '../../atoms/bottom-navigation-button';

const Commentary = ({
    subHeaderLabel = '',
    title = 'Comentário',
    placeHolder = 'Escreva um comentário',
    commentary = '',
    setCommentary,
    finishButtonLabel = 'Finalizar',
    onClose = () => {},
    onSave = () => {}
}) => {

    return (
        <Container>
            <Content>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={subHeaderLabel}
                    onClose={() => onClose()}
                />
                <Body>
                    <PageTitle>{title}</PageTitle>
                    <TextAreaDefault
                        name={'justification'}
                        placeholder={placeHolder}
                        value={commentary}
                        onChange={({ target }) => setCommentary(target.value)}
                    />
                </Body>

                <BottomNavigationButton
                    onNext={() => onSave()}
                    nextLabel={finishButtonLabel}
                    positionRelative={true}
                    onBack={() => onClose()}
                />
            </Content>
        </Container>
    );
};

export default Commentary;
