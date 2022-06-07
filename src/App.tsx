import React, {useEffect, useState} from 'react';
import Carousel from './components/Carousel';
import Footer from './components/Layout/Footer';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalStateType} from './ts/types';
import {AppDispatch} from './app/store';
import {fetchCollections, fetchStories} from './utils/data';
import Slide from './components/Carousel/Slide';
import Loader from './components/Loader';
import Section from './components/UI/Section';
import styled from 'styled-components/macro';

const App: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const {storiesStatus, allStories} = useSelector((state: GlobalStateType) => state.stories);
    const {collectionsStatus, allCollections} = useSelector((state: GlobalStateType) => state.collections);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (storiesStatus === 'idle' && loaded) {
            dispatch(fetchStories());
        }
    }, [storiesStatus, loaded]);

    useEffect(() => {
        if (collectionsStatus === 'idle' && loaded) {
            dispatch(fetchCollections());
        }
    }, [collectionsStatus, loaded]);

    return (
        <>
            <Main>
                <Section>
                    <h3>Stories</h3>
                    {allStories ? (
                        <Carousel
                            offsetBefore={20}
                            betweenSlides={20}
                            borderRadius={200}
                            imageFit="cover"
                            hoverEffect="zoom"
                            hoverZoom={1.2}
                            draggable
                            transitionSpeed="500ms"
                            transitionFnc="ease-out"
                        >
                            {allStories
                                ? allStories.map((story) => (
                                      <Slide key={story.id} borderRadius={200} style={{height: 200, width: 200}}>
                                          <img src={story.cover_src || ''} alt={story.user.display_name} />
                                      </Slide>
                                  ))
                                : null}
                        </Carousel>
                    ) : (
                        <Loader />
                    )}
                </Section>
                <Section>
                    <h3>Collections</h3>
                    {allStories ? (
                        <Carousel
                            offsetBefore={40}
                            betweenSlides={20}
                            imageFit="cover"
                            borderRadius={30}
                            hoverEffect="translate"
                            draggable
                        >
                            {allCollections && allCollections.length > 0
                                ? allCollections.map((userCollection) => (
                                      <Slide key={userCollection.id} style={{height: 140, width: 300}}>
                                          <img
                                              style={{
                                                  backgroundColor: userCollection.user.collections[0].cover_image_bg
                                              }}
                                              src={userCollection.user.collections[0].cover_image_url || ''}
                                              alt={userCollection.user.collections[0].name}
                                          />
                                      </Slide>
                                  ))
                                : null}
                        </Carousel>
                    ) : (
                        <Loader />
                    )}
                </Section>
            </Main>
            <Footer />
        </>
    );
};

export default App;

const Main = styled.main`
    padding-bottom: 60px;
`;
