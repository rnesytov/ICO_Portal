import React from 'react'
import styled from 'styled-components';
import Cleave from 'cleave.js/react';
import {media} from 'js/utils/media';

import ErrorMessage from 'js/components/common/ErrorMessage';
import { Field } from 'formik';

const InputText = ({placeholder, options, name, value, disabled, type, errors, touched}) => {

    return (
        <Wrapper>
            <Field 
                name={name} 
                render={({field}) => (
                    <StyledInput className={errors[name] && 'isInvalid'} 
                        placeholder={placeholder} 
                        type={type || 'text'} 
                        id={name} 
                        disabled={disabled ? true : false} 
                        options={options || {delimiter: ''}} 
                        {...field}/>
                )}/> 
            {errors[name] && <ErrorMessage text={errors[name]}/>}
        </Wrapper>
    );
}


export default InputText;

const Wrapper = styled.div`
    position: relative;
`;

const StyledInput = styled(Cleave)`
    color: #233539;
    font-size: 16px;
    font-weight: 500;
    height: 100%;
    padding: 0 20px;
    display: block;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: 1px solid ${props => props.errortext ? 'rgb(242, 109, 109)' : '#EAEFF2'};
    ${media.xs} {
        font-size: 14px;
    }
    &:read-only {
        color: rgba(35,53,57,.3);
    }
    &.isInvalid {
        border-color: rgb(242, 109, 109);
    }
`;
