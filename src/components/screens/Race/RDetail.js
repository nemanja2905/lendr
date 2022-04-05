import React from 'react';

import RDContainer from '@components/RaceDetail/RDContainer';

function RaceDetail({ route }) {
    // TODO: check if the key exists or not, then do error handling here
    return <RDContainer raceid={route.params?.raceid} />;
}

export default RaceDetail;
