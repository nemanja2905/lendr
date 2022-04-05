import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

const convert2Value = (org, flag = 1) => {
    //1: to origin value
    //2: to mask value
    if (org === undefined) return '';
    return flag === 1
        ? org
              //   .replaceAll(' ', '')
              .split('')
              .filter((c, i) => c !== ' ')
              .map((c, i) => (c < '0' || c > '9' ? '0' : c))
              .join('')
        : org
              //   .replaceAll(' ', '')
              .split('')
              .filter((c, i) => c !== ' ')
              .map((c, i) => (i < 12 ? '*' : c))
              .join('')
              .replace(/(.{4})/g, '$1 ')
              .trim();
};

const CustomMaskInput = (props) => {
    const { value, id, name, onChange, ...rest } = props;
    const [state, setState] = useState({
        value: '',
        maskedValue: '',
    });

    useEffect(() => {
        console.log('CustomMaskInput, useEffect ', props.value);
        setState({
            value: convert2Value(value, 1),
            maskedValue: convert2Value(value, 2),
        });
    }, []);

    // const handleChange2 = e => {
    //   // console.log("CustomMaskInput hiddenvalue=", e.target.value);
    // }
    const handleChange = (e) => {
        //let newMaskedValue = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        let newValueArrayNumberOnly = e.target.value
            .split('')
            .filter((c, i) => i < 19 && (c === '*' || (c >= '0' && c <= '9')));
        // console.log('newNumberArray', newValueArrayNumberOnly);
        let oldValueArray = state.value.split('');
        // console.log('oldValueArray', oldValueArray);
        let newValue = newValueArrayNumberOnly
            .map((c, i) => (i < oldValueArray.length ? oldValueArray[i] : c))
            .join('');
        // console.log('newValue', newValue);
        let newMask = newValueArrayNumberOnly
            .map((c, i) => (i < 12 ? '*' : c))
            .join('')
            .replace(/(.{4})/g, '$1 ')
            .trim();
        // console.log('newMask', newMask);
        // console.log(newValue, newMask, onChange);
        e.target.value = newValue;
        if (onChange !== undefined) {
            // console.log('onChange recall...');
            onChange(e);
        }

        setState({
            value: newValue,
            maskedValue: newMask,
        });

        //e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    };
    return (
        <>
            <TextInput
                id={id}
                value={state.maskedValue}
                onChange={handleChange}
                {...rest}
            />
            <TextInput
                type="hidden"
                name={name}
                value={state.value}
                // onChange={handleChange2}
                style={{ width: 0 }}
            />
        </>
    );
};
export default CustomMaskInput;
