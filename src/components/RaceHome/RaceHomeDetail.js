import { View, Text, StyleSheet } from 'react-native';

import DataContainerHD from './RHDContainer';

function RaceHomeDetail(props) {
    if (props.data === null && props.loading) {
        return <Text>Loading</Text>;
    } else if (props.data === null && !props.loading && props.error) {
        return <Text>Something went wrong</Text>;
    }
    return (
        <View style={{ marginTop: 5 }}>
            {props.filters.includes('R') &&
                props.filters.includes('AU') &&
                props.data.au.racing && (
                    <DataContainerHD
                        label="Horse Racing - Australia & NZ"
                        data={props.data.au.racing}
                    />
                )}
            {props.filters.includes('R') &&
                props.filters.includes('INT') &&
                props.data.int.racing && (
                    <DataContainerHD
                        label="Horse Racing - International"
                        data={props.data.int.racing}
                    />
                )}
            {props.filters.includes('G') &&
                props.filters.includes('AU') &&
                props.data.au.greyhounds && (
                    <DataContainerHD
                        label="Greyhound Racing - Australia & NZ"
                        data={props.data.au.greyhounds}
                    />
                )}
            {props.filters.includes('G') &&
                props.filters.includes('INT') &&
                props.data.int.greyhounds && (
                    <DataContainerHD
                        label="Greyhound Racing - International"
                        data={props.data.int.greyhounds}
                    />
                )}
            {props.filters.includes('H') &&
                props.filters.includes('AU') &&
                props.data.au.harness && (
                    <DataContainerHD
                        label="Harness Racing - Australia & NZ"
                        data={props.data.au.harness}
                    />
                )}
            {props.filters.includes('H') &&
                props.filters.includes('INT') &&
                props.data.int.harness && (
                    <DataContainerHD
                        label="Harness Racing - International"
                        data={props.data.int.harness}
                    />
                )}
        </View>
    );
}

const styles = StyleSheet.create({});

export default RaceHomeDetail;
