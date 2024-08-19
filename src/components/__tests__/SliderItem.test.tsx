import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SliderItem from '../SliderItem';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: jest.fn().mockReturnValue(null),
}));

describe('SliderItem', () => {
    const data = {
        poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
        title: 'Test Movie',
        name: '',
        vote_average: 8.5,
    };

    const navigatePageMock = jest.fn();

    it('renders the image, title, and rating correctly', () => {
        const { getByText, getByTestId } = render(
            <SliderItem data={data} navigatePage={navigatePageMock} />
        );

        // Verifica se o título foi renderizado
        expect(getByText('Test Movie')).toBeTruthy();

        // Verifica se a nota foi renderizada
        expect(getByText('8.5')).toBeTruthy();

        // Verifica se a imagem foi renderizada com a URL correta
        const image = getByTestId('slider-item-image');
        expect(image.props.source.uri).toBe('https://image.tmdb.org/t/p/original/1E5baAaEse26fej7uHcjOgEE2t2.jpg');
    });

    it('calls navigatePage when the item is pressed', () => {
        const { getByTestId } = render(
            <SliderItem data={data} navigatePage={navigatePageMock} />
        );

        const touchable = getByTestId('slider-item-touchable');
        fireEvent.press(touchable);

        expect(navigatePageMock).toHaveBeenCalledWith(data);
    });
});