import React, { Fragment, useEffect, useState } from 'react';
import { WhiteHeader } from '../../components/atoms';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { contentById } from '../../services/endpoints/pos';
import { Container, Content } from './styles';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/organisms';
import { LoadingContainer } from '../../components/molecules';

function TermsOfUse() {
    const history = useHistory();

    const [contentPage, setContentPage] = useState('');
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        const content = await contentById(6);

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
                    title={'Termos de Uso'}
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

export default TermsOfUse;
