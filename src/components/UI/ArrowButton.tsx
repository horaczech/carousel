import React, {HTMLProps, ReactNode} from 'react';
import {IoArrowBackOutline, IoArrowForwardOutline} from 'react-icons/io5';
import styled from 'styled-components/macro';
import {OFFSETS} from '../../constants/style';

interface Props extends HTMLProps<HTMLButtonElement> {
    arrow: 'left' | 'right' | 'custom';
    children?: ReactNode;
}

const ArrowButton: React.FC<Props> = ({arrow, children, onClick}) => {
    const Arrow = arrow === 'left' ? IoArrowBackOutline : arrow === 'right' ? IoArrowForwardOutline : null;

    return <Button onClick={onClick}>{Arrow ? <Arrow size={30} /> : children}</Button>;
};

export default ArrowButton;

const Button = styled.button`
    margin: ${OFFSETS.small};
`;
