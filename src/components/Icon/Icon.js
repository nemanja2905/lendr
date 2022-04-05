import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import ChampionIcon from '../../../assets/svg/championcup.svg';
import CheckIcon from '../../../assets/svg/check.svg';
import CogIcon from '../../../assets/svg/cog.svg';
import InfoIcon from '../../../assets/svg/info.svg';
import LockIcon from '../../../assets/svg/lock.svg';
import ResultIcon from '../../../assets/svg/result.svg';
import ClockIcon from '../../../assets/svg/clock.svg';
import AvatarIcon from '../../../assets/svg/avatar.svg';
import IBaseIcon from '../../../assets/svg/icon-BASE.svg';
import ISoccIcon from '../../../assets/svg/icon-SOCC.svg';

import ALPS from '../../../assets/svg/icon-ALPS.svg';
import ATHL from '../../../assets/svg/icon-ATHL.svg';
import BADM from '../../../assets/svg/icon-BADM.svg';
import BAND from '../../../assets/svg/icon-BAND.svg';
import BASE from '../../../assets/svg/icon-BASE.svg';
import BASK from '../../../assets/svg/icon-BASK.svg';
import BOX from '../../../assets/svg/icon-BOX.svg';
import BVOL from '../../../assets/svg/icon-BVOL.svg';
import CRIC from '../../../assets/svg/icon-CRIC.svg';
import CYCL from '../../../assets/svg/icon-CYCL.svg';
import DART from '../../../assets/svg/icon-DART.svg';
import GAEF from '../../../assets/svg/icon-GAEF.svg';
import GLOBE from '../../../assets/svg/icon-GLOBE.svg';
import GOLF from '../../../assets/svg/icon-GOLF.svg';
import GREYS from '../../../assets/svg/icon-GREYS.svg';
import HARN from '../../../assets/svg/icon-HARN.svg';
import HOCK from '../../../assets/svg/icon-HOCK.svg';
import HORSES from '../../../assets/svg/icon-HORSES.svg';
import HARNESS from '../../../assets/svg/icon-HARNESS.svg';
import JCKY from '../../../assets/svg/icon-JCKY.svg';
import MOTR from '../../../assets/svg/icon-MOTR.svg';
import NVU from '../../../assets/svg/icon-NVU.svg';
import POKR from '../../../assets/svg/icon-POKR.svg';
import POLS from '../../../assets/svg/icon-POLS.svg';
import PONG from '../../../assets/svg/icon-PONG.svg';
import RACING from '../../../assets/svg/icon-RACING.svg';
import RGLE from '../../../assets/svg/icon-RGLE.svg';
import RGUN from '../../../assets/svg/icon-RGUN.svg';
import ROWI from '../../../assets/svg/icon-ROWI.svg';
import SGM from '../../../assets/svg/icon-SGM.svg';
import SHSH from '../../../assets/svg/icon-SHSH.svg';
import SNOO from '../../../assets/svg/icon-SNOO.svg';
import SOCC from '../../../assets/svg/icon-SOCC.svg';
import SOFT from '../../../assets/svg/icon-SOFT.svg';
import SPORT from '../../../assets/svg/icon-SPORT.svg';
import SUMO from '../../../assets/svg/icon-SUMO.svg';
import SWIM from '../../../assets/svg/icon-SWIM.svg';
import TENN from '../../../assets/svg/icon-TENN.svg';

import TICK from '../../../assets/svg/icon-TICK.svg';
import SURF from '../../../assets/svg/icon-SURF.svg';
import TRIA from '../../../assets/svg/icon-TRIA.svg';
import VOLL from '../../../assets/svg/icon-VOLL.svg';
import WPLO from '../../../assets/svg/icon-WPLO.svg';
import YACH from '../../../assets/svg/icon-YACH.svg';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgUri, SvgXml } from 'react-native-svg';
import { Image } from 'react-native';
export const requiredIcons = {
    ALPS,
    ATHL,
    BADM,
    BAND,
    BASE,
    BASK,
    BOX,
    BVOL,
    CRIC,
    CYCL,
    DART,
    GAEF,
    GLOBE,
    GOLF,
    GREYS,
    HARN,
    HOCK,
    HORSES,
    HARNESS,

    JCKY,
    MOTR,
    NVU,
    POKR,
    POLS,
    PONG,
    RACING,
    RGLE,
    RGUN,
    ROWI,
    SGM,
    SHSH,
    SNOO,
    SOCC: SOCC,
    SOFT,
    SPORT,
    SUMO,
    SWIM,
    TENN,
    TICK,
    SURF,
    TRIA,
    VOLL,
    WPLO,
    YACH,
};
const Icon2 = createIconSetFromIcoMoon(
    require('../../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);
const icons = {
    horses: (
        <HORSES
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    greys: (
        <GREYS
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    harness: (
        <HARNESS
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    champion: (
        <ChampionIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    check: (
        <CheckIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    cog: (
        <CogIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    lock: (
        <LockIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    result: (
        <ResultIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    info: (
        <InfoIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    clock: (
        <ClockIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    avatar: (
        <AvatarIcon
            width={18}
            height={18}
            style={{
                fill: '#d3d3d3',
            }}
        />
    ),
    SOCC: (
        <ISoccIcon
            width={28}
            height={28}
            style={
                {
                    // fill: '#0f0d0d',
                }
            }
        />
    ),
};
export const AssetIcon = ({ name, size }) => {
    if (icons[name] === undefined) {
        if (name === 'R')
            return (
                <HORSES
                    width={size}
                    height={size}
                    style={{ fill: '#0f0d0d' }}
                />
            );
        else if (name === 'H')
            return (
                <HARNESS
                    width={size}
                    height={size}
                    style={{ fill: '#0f0d0d' }}
                />
            );
        else if (name === 'G')
            return (
                <GREYS width={size} height={size} style={{ fill: '#0f0d0d' }} />
            );
        else return <Icon name={name} size={20} color="black" />;
    } else return icons[name];
};
// const JCKY2 = require('../../../assets/icon-SOCC.svg');
// export const getImage2 = (name) => {
//     console.log('getImage2');
//     return JCKY2;
// };

export const SvgIcon = ({ name, size = 18 }) => {
    if (requiredIcons[name] === undefined) {
        // console.log('SvgIcon undefined=', name);
        // return <Icon name={name} size={20} color="black" />;
        return (
            <Image
                source={{ url: name }}
                style={{
                    resizeMode: 'contain',
                    height: size,
                    width: 0,
                }}
            />
        );
    } else {
        let Component = SOCC;
        switch (name) {
            case 'SOCC':
                Component = SOCC;
                break;
            case 'ALPS':
                Component = ALPS;
                break;
            case 'ATHL':
                Component = ATHL;
            case 'BADM':
                Component = BADM;
                break;
            case 'BASK':
                Component = BASK;
                break;
            case 'BASE':
                Component = BASE;
                break;
            case 'BOX':
                Component = BOX;
                break;
            case 'BVOL':
                Component = BVOL;
                break;
            case 'CRIC':
                Component = CRIC;
                break;
            case 'CYCL':
                Component = CYCL;
                break;
            case 'GOLF':
                Component = GOLF;
                break;
            case 'GREYS':
                Component = GREYS;
                break;
            case 'HARN':
                Component = HARN;
                break;
            case 'HOCK':
                Component = HOCK;
                break;
            case 'HORSES':
                Component = HORSES;
                break;
            case 'HARNESS':
                Component = HARNESS;
                break;
            case 'JCKY':
                Component = JCKY;
                break;
            case 'MOTR':
                Component = MOTR;
                break;
            case 'POKR':
                Component = POKR;
                break;
            case 'POLS':
                Component = POLS;
                break;
            case 'PONG':
                Component = PONG;
                break;
            case 'RACING':
                Component = RACING;
                break;
            case 'RGLE':
                Component = RGLE;
                break;
            case 'RGUN':
                Component = RGUN;
                break;
            case 'ROWI':
                Component = ROWI;
                break;
            case 'SOFT':
                Component = SOFT;
                break;
            case 'SPORT':
                Component = SPORT;
                break;
            case 'SUMO':
                Component = SUMO;
                break;
            case 'SWIM':
                Component = SWIM;
                break;
            case 'TENN':
                Component = TENN;
                break;
            case 'SURF':
                Component = SURF;
                break;
            case 'TRIA':
                Component = TRIA;
                break;
            case 'VOLL':
                Component = VOLL;
                break;
            case 'WPLO':
                Component = WPLO;
                break;
            case 'YACH':
                Component = YACH;
                break;
            default:
                break;
        }

        // console.log('SVGIcon Component=', name);
        return (
            <Component
                width={size}
                height={size}
                viewPort={(0, 0, size, size)}
                style={{ fill: '#0f0d0d' }}
                color="black"
            />
        );
    }
};
export default function CustomIcon(props) {
    return <Icon2 name={props.name} size={props.size} color={props.color} />;
}
