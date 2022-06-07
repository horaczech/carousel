import React, {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components/macro';

interface Props {
    children?: ReactNode;
    style?: CSSProperties;
}

const Section: React.FC<Props> = ({children, style}) => {
    return <Container style={style}>{children}</Container>;
};

export default Section;

const Container = styled.section`
    padding: 20px;
    overflow: hidden;
`;
