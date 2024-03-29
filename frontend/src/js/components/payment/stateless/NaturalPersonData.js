import React from 'react'
import styled from 'styled-components';
import {media} from 'js/utils/media';

import FormikField from 'js/components/common/FormikField';


const NaturalPersonData = ({errors, touched, values, kycStatus}) => {

    return (
        <InputSet>
            <input type="hidden" name='type' value='NATURAL'/>
            <InputWrapper>
                <FormikField 
                    value={values.firstname || ''} 
                    className="Verification_requiredField"
                    name="firstname"
                    placeholder="John" 
                    labelText="First Name" 
                    errors={errors} 
                    touched={touched}
                    required/> 
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.middlename || ''} 
                    name="middlename"
                    placeholder={(kycStatus !== "WAITING" || kycStatus !== "APPROVED") && "Fitzgerald" || ""}
                    labelText="Middle Name" 
                    errors={errors} 
                    touched={touched}/> 
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.lastname || ''} 
                    className="Verification_requiredField"
                    name="lastname"
                    placeholder="Kennedy" 
                    labelText="Last Name"
                    errors={errors} 
                    touched={touched}
                    required/> 
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.place_of_birth || ''} 
                    className="Verification_requiredField"
                    name="place_of_birth"
                    labelText="Place of birth" 
                    placeholder="Brookline, Massachusetts, United States" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.birthdate || ''} 
                    className="Verification_requiredField"
                    name="birthdate" 
                    placeholder="1917/05/29" 
                    labelText="Date of birth" 
                    errors={errors} 
                    touched={touched}
                    options={{date: true, datePattern: ['Y', 'm', 'd'], delimiter: '-'}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.personal_id || ''} 
                    className="Verification_requiredField"
                    name="personal_id" 
                    labelText="Personal identification code"
                    placeholder="915344722819"
                    errors={errors} 
                    touched={touched}
                    options={{numericOnly: true}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.phone_number || ''} 
                    className="Verification_requiredField"
                    name="phone_number"
                    placeholder="+15417543010" 
                    labelText="Phone number"
                    errors={errors} 
                    touched={touched}
                    options={{numericOnly: true, prefix: '+', noImmediatePrefix: true}}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.email || ''} 
                    className="Verification_requiredField"
                    name="email" 
                    type="email" 
                    placeholder="john@gmail.com" 
                    labelText="Email" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.place_of_residence || ''} 
                    className="Verification_requiredField"
                    name="place_of_residence" 
                    placeholder="4150 Sydney Place Washington, DC 20521-4150" 
                    labelText="Place of residence"
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
            <InputWrapper>
                <FormikField 
                    value={values.profession || ''} 
                    className="Verification_requiredField"
                    name="profession" 
                    placeholder="Software developer" 
                    labelText="Profession or field of activity" 
                    errors={errors} 
                    touched={touched}
                    required/>
            </InputWrapper>
        </InputSet>
    )
}

export default NaturalPersonData;


const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    margin-bottom: 35px;
    border-bottom: 1px solid rgba(151,151,151,.25);
    ${media.xs} {
        padding-bottom: 30px
    }
`;

const InputWrapper = styled.div`
    height: 45px;
    flex-basis: 48%;
    position: relative;
    ${media.xs} {
        flex-basis: 100%;
    }
    &:not(:last-child) {
        margin-bottom: 70px;
        ${media.xs} {
            margin-bottom: 50px;
        }
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;


