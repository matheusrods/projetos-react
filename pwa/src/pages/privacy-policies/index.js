import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { contentById } from '../../services/endpoints/pos';
import { WhiteHeader } from '../../components/atoms';
import { Header } from '../../components/organisms';
import { Container, Content } from './styles';
import { LoadingContainer } from '../../components/molecules';

function PrivacyPolicies() {
    const history = useHistory();

    const [contentPage, setContentPage] = useState('');
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        const content = await contentById(5);

        if (content) {
            setContentPage(content);
        }

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Política de Privacidade'}
                    onClose={() => history.goBack()}
                />
                <Content loading={loading}>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: contentPage }}
                        />
                    )}
                </Content>
            </Container>
        </Fragment>
    );
}

export default PrivacyPolicies;
