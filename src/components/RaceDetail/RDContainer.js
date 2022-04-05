import { StyleSheet, ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import { config } from '@Config';
import { colors } from '@Colors';
import { fonts } from '@Fonts';

// Data Models
import EventDetails from '@Models/EventDetails';
import FieldsModel from '@Models/Fields';
import qMeeting from '@Models/Meetings';

// Sub Components
import RaceSlider from './RDRaceSlider';
import MeetSelect from './MeetSelect';
import RDFields from './RDFieldsContainer';

function RDContainer(props) {
    const [raceid, setRaceID] = useState(props.raceid);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [raceNumbers, setRaceNumbers] = useState([]);
    const [raceLocations, setRaceLocations] = useState([]);

    async function getRaceDetails() {
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

                let raceNum = [];
                if (response.qRace && response.qRace.length > 0) {
                    response.qRace.forEach((race) => {
                        raceNum.push({
                            racenum: race.RACENUM,
                            raceid: race.RACEID,
                            racetype: race.RACETYPE,
                            racerun: race.RACERUN === 1 ? true : false,
                            racemeet: race.RACEMEET.toLowerCase(),
                        });
                    });
                }

                let qMeet = [];
                if (response.QMEETINGS && response.QMEETINGS.length) {
                    response.QMEETINGS.forEach((meeting) => {
                        let meet = new qMeeting({
                            abandoned: meeting.ABANDONED,
                            category: meeting.CATEGORY,
                            countrylabel: meeting.COUNTRYLABEL,
                            nextrace: meeting.NEXTRACEID,
                            racemeet: meeting.RACEMEET,
                            racetype: meeting.RACETYPE,
                            racetimeutc: meeting.RACETIMEUTC,
                        });

                        qMeet.push(meet);
                    });
                }

                // if (response.availexotics && response.availexotics.length > 0) {
                //     setavailexotics(response.availexotics);
                // }
                // if (response.betproducts && response.betproducts.length > 0) {
                //     setbetproducts(response.betproducts);
                // }

                setRaceNumbers(raceNum);
                setRaceLocations(qMeet);
            } else {
                setError(true);
            }
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    }
    useEffect(() => {
        async function getInitialData() {
            setLoading(true);
            await getRaceDetails();
            setLoading(false);
        }
        getInitialData();
    }, []);

    if (loading) <Text>Loading your data</Text>;

    return (
        <ScrollView style={styles.container}>
            <MeetSelect raceLocations={raceLocations} />
            <RaceSlider raceNumbers={raceNumbers} callback={() => {}} />
            <RDFields raceid={raceid} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
});

export default RDContainer;
