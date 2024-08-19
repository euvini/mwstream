import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoriteItem from '../FavoriteItem';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: jest.fn().mockReturnValue(null),
    Feather: jest.fn().mockReturnValue(null),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('FavoriteItem', () => {
    const data = {
        id: '1',
        title: 'Example Movie',
        name: '',
        vote_average: 8.5,
    };

    const deleteMovieMock = jest.fn();
    const navigatePageMock = jest.fn();

    it('renders the movie title and rating correctly', () => {
        const { getByText } = render(
            <FavoriteItem data={data} deleteMovie={deleteMovieMock} navigatePage={navigatePageMock} />
        );

        expect(getByText('Example Movie')).toBeTruthy();
        expect(getByText('8.5')).toBeTruthy();
    });

    it('calls navigatePage when the details button is pressed', () => {
        const { getByText } = render(
            <FavoriteItem data={data} deleteMovie={deleteMovieMock} navigatePage={navigatePageMock} />
        );

        const detailsButton = getByText('viewDetails');
        fireEvent.press(detailsButton);

        expect(navigatePageMock).toHaveBeenCalledWith(data);
    });

    it('calls deleteMovie when the delete button is pressed', () => {
        const { getByTestId } = render(
            <FavoriteItem data={data} deleteMovie={deleteMovieMock} navigatePage={navigatePageMock} />
        );

        const deleteButton = getByTestId('delete-button');
        fireEvent.press(deleteButton);

        expect(deleteMovieMock).toHaveBeenCalledWith('1');
    });
});