import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LogBox } from 'react-native';
import { config } from '@Config';
import SwipeableViews from 'react-swipeable-views-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import SwipeableView from 'react-native-swipeable-view';
const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: `${config.cdn}/images/promotions/promoImg01.PNG`,
    },
    {
        label: 'Bird',
        imgPath: `${config.cdn}/images/promotions/promoImg02.PNG`,
    },
    {
        label: 'Bali, Indonesia',
        imgPath: `${config.cdn}/images/promotions/promoImg03.PNG`,
    },
];

export default function Slider(props) {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    useEffect(() => {
        const idx = setInterval(() => {
            // console.log('Slider activeStep = ', activeStep, maxSteps);
            if (activeStep < maxSteps - 1) {
                setActiveStep(activeStep + 1);
            } else {
                setActiveStep(0);
            }
        }, 3000);
        return () => clearInterval(idx);
    }, [activeStep]);

    const handleNext = () => {
        if (activeStep < maxSteps - 1) setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <View>
            <SwipeableViews styles={styles.slideContainer} index={activeStep}>
                {images.map((step, idx) => (
                    <Image
                        key={idx}
                        source={{ uri: step.imgPath }}
                        alt={step.label}
                        style={styles.image}
                    />
                ))}
            </SwipeableViews>
            <View style={styles.steppers}>
                <TouchableOpacity onPress={handleBack}>
                    <Text style={styles.stepper}>&#10094;</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.stepper}>&#10095;</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dots}>
                {[...Array(maxSteps)].map((obj, idx) => (
                    <TouchableOpacity
                        onPress={() => handleStepChange(idx)}
                        style={styles.dot}
                    >
                        <Text
                            style={{
                                color:
                                    idx === activeStep
                                        ? '#FCDF4C'
                                        : 'rgba(0,0,0,0.6)',
                            }}
                        >
                            {'\u2B24'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    slideContainer: {
        position: 'absolute',
        height: 100,
    },
    image: {
        // overflow: 'hidden',
        width: '100%',
        height: 100,
    },
    dots: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0,
    },
    dot: {
        paddingHorizontal: 2,
    },
    stepper: {
        color: '#FCDF4C',
        // opacity: 0.5,
    },

    steppers: {
        position: 'absolute',
        width: '100%',
        top: '40%',
        //
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    slide: {
        padding: 15,
        height: 100,
    },

    text: {
        color: '#fff',
        fontSize: 16,
    },
});
