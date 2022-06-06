import React from 'react';
import {render} from '@testing-library/react';
import Carousel from '../index';
import Slide from '../Slide';

describe('carousel', () => {
    test('renders all children', () => {
        const {container} = render(
            <Carousel
                offsetBefore={20}
                betweenSlides={20}
                borderRadius={200}
                imageFit="cover"
                draggable
                transitionSpeed="500ms"
                transitionFnc="ease-out"
            >
                {['first', 'second', 'third'].map((slide, i) => (
                    <Slide key={i}>{slide}</Slide>
                ))}
            </Carousel>
        );
        expect(container.getElementsByClassName('slide').length).toBe(3);
    });
});
