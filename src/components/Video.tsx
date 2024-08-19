import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Video, { VideoRef } from 'react-native-video';
import { theme } from '../theme/theme';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

interface VideoProp {
    onClose: () => void
}

export function VideoComponent(props: VideoProp) {
    const videoRef = useRef<VideoRef>(null);
    const background = require('../../assets/big_buck_bunny.mp4');

    return (
        <Animated.View style={styles.backgroundVideo} entering={FadeInDown} exiting={FadeOutDown}>
            <Video
                source={background}
                ref={videoRef}
                style={[StyleSheet.absoluteFillObject]}
                fullscreen
                resizeMode='contain'
                fullscreenAutorotate
                fullscreenOrientation='landscape'
                onEnd={props.onClose}
            />
            <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
                <Ionicons name="close" size={28} color={theme.colors.white} />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    backgroundVideo: {
        backgroundColor: theme.colors.black,
        elevation: 1,
        ...StyleSheet.absoluteFillObject,
        zIndex: 20
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 15,
        padding: 5,
        backgroundColor: theme.colors.green
    }
})