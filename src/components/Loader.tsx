import React, {CSSProperties} from 'react';
import {TailSpin} from 'react-loader-spinner';
import styled from 'styled-components/macro';
import {flex, OFFSETS} from '../constants/style';

interface Props {
    style?: CSSProperties;
}

const Loader: React.FC<Props> = ({style}) => {
    return (
        <Container style={style}>
            <TailSpin color="#808080" height={60} width={60} />
        </Container>
    );
};

export default Loader;

const Container = styled.div`
    ${flex.center}
    padding: ${OFFSETS.large}
`;
