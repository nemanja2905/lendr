import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

import FieldsModel from '@Models/Fields';
import EventDetails from '@Models/EventDetails';
import RDFieldsData from './RDFieldsData';

import EDetails from './RDEventDetails';

function RDFields({ raceid }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [raceFields, setRaceFields] = useState([]);
    const [eventDetails, setEventDetails] = useState();
    const [availexotics, setavailexotics] = useState({});
    const [betproducts, setbetproducts] = useState([]);

    const [raceResulted, setRaceResulted] = useState(false);

    async function getRace() {
        const url = `${config.domain}/races/getRaceDayEvents`;
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: config.appBrand,
            },
            body: JSON.stringify({
                raceid: raceid,
                field: 'true',
                meeting: 'true',
                clientid: null,
            }),
        };

        try {
            const response = await (await fetch(url, options)).json();
            if (response.ERROBJ.ERRORCODE == 0) {
                setError(false);

                let fields = [];
                let sFields = [];

                if (response.QRACEDETAIL && response.QRACEDETAIL.length > 0) {
                    response.QRACEDETAIL.forEach((field) => {
                        let rData = new FieldsModel({
                            actualcode: field.ACTUALCODE,
                            image: field.JOCKEYCOLORSLINK,
                            fieldnum: field.FIELDNUM,
                            fieldname: field.FIELDNAME,
                            weight: field.WEIGHT,
                            lastten: field.LASTTEN,
                            jockey: field.JOCKEY,
                            trainer: field.TRAINER,
                            scratching: field.SCRATCHING,
                            barrier: field.BARRIER,
                            racemeet: response.selectedRace[0].RACEMEET,
                            racetimeutc: response.selectedRace[0].RACETIMEUTC,
                            racenum: response.selectedRace[0].RACENUM,
                            eventname: response.selectedRace[0].EVENT,
                            fav: field.FAVIND,
                            sprites: field.SPRICES,
                            flucs: field.FLUCS,
                            scratchtime: field.SCRATCHTIME,
                        });

                        if (field.SCRATCHING === 'N') {
                            fields.push(rData);
                        } else {
                            sFields.push(rData);
                        }
                    });

                    let sortedFields = [...fields, ...sFields];
                    setRaceFields(sortedFields);

                    setEventDetails(
                        new EventDetails({
                            racedate: response.selectedRace[0].RACEDATE,
                            racetime: response.selectedRace[0].RACETIME,
                            racedistance: response.selectedRace[0].RACEDISTANCE,
                            trackcondition:
                                response.selectedRace[0].TRACKCONDITION,
                            event: response.selectedRace[0].EVENT,
                            weather: response.selectedRace[0].WEATHER,
                            racetimeutc: response.selectedRace[0].RACETIMEUTC,
                            racenum: response.selectedRace[0].RACENUM,
                        })
                    );

                    let resulted = response.selectedRace[0].STATUSDESC;
                    if (resulted === 'Resulted') {
                        setRaceResulted(true);
                    } else {
                        setRaceResulted(false);
                    }
                    if (response.availexotics) {
                        setavailexotics(response.availexotics);
                    }
                    if (
                        response.betproducts &&
                        response.betproducts.length > 0
                    ) {
                        setbetproducts(response.betproducts);
                    }
                }
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
        }
    }

    useEffect(() => {
        async function getDetails() {
            await getRace();
        }

        getDetails();
    }, [raceid]);

    if (loading) return <Text>Loading</Text>;
    return (
        <View style={styles.container}>
            <EDetails eventDetails={eventDetails} />
            {raceFields && (
                <RDFieldsData
                    raceFields={raceFields}
                    raceid={raceid}
                    availexotics={availexotics}
                    betproducts={betproducts}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
});

export default RDFields;
