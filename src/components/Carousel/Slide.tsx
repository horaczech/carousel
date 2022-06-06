import React, {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components/macro';
import {SlideProps} from '../../ts/interface';

interface Props extends SlideProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: 'string';
}

const Slide: React.FC<Props> = (props) => {
    const {children, style, betweenSlides, imageFit, borderRadius, className} = props;

    return (
        <CarouselSlide
            className={`slide ${className || ''}`}
            style={{...(betweenSlides && {marginRight: betweenSlides}), ...{borderRadius}, ...style}}
            imageFit={imageFit}
        >
            {children}
        </CarouselSlide>
    );
};

export default Slide;

const CarouselSlide = styled.div<SlideProps>`
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;

    * {
        user-select: none;
        pointer-events: none;
    }

    img {
        object-fit: ${({imageFit}) => imageFit || 'contain'};
        width: 100%;
        height: 100%;
    }
`;
