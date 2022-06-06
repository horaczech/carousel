export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ErrorType = null | string;

export type StoryType = {
    id: number;
    user: UserType;
};

export type UserType = {
    id: number;
    display_name: string;
    collections: {
        id: number;
        name: string;
        cover_image_url: string | null;
        cover_image_bg: string;
    }[];
};

export type Story = {
    id: number;
    user: UserType;
    cover_src: string | null;
};

export type StoriesState = {
    allStories: Story[] | null;
    storiesStatus: StatusType;
    error: ErrorType;
};

export type CollectionType = {
    id: number;
    user: UserType;
};

export type CollectionsState = {
    allCollections: CollectionType[] | null;
    collectionsStatus: StatusType;
    error: ErrorType;
};

export type GlobalStateType = {
    stories: StoriesState;
    collections: CollectionsState;
};
