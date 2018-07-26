import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';
import { Field } from 'react-final-form';

import Utils from './../utils/index';

import * as KYCActions from './../actions/KYCActions';

import FinalFormField from './../components/FinalFormField';
import FinalFormRadio from './../components/FinalFormRadio';
import Button from './../components/Button';
import * as UIActions from "../actions/UIActions";
import FileUpload from "../components/FileUpload";

const File = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);

class LegalPersonData extends React.Component {

    constructor() {
        super()

        let onRemoveFileHandler = this.onRemoveFileHandler;

        $(document).ready(function() {
            $('.Verification__personData').click(function(event) {
                if ($(event.target).hasClass('file-clear')) {
                    let parent = $(event.target).closest('.block-file');
                    onRemoveFileHandler(event.target, parent)
                }
            })
        })
    }


    buildVisualFile = (target, obj) => {
        let name = obj.name,
            size = obj.size,
            id = $(target).attr('id');

        $(target)
            .closest('div')
            .siblings('.block-file-result')
            .append(`
                <div class="visual-file-block" data-bind-to='${id}'>
                    <span class="file-name">${name}</span> (<span class="file-size">${Utils.formatFileSize(size).size} ${Utils.formatFileSize(size).units})</span>
                    <div class="file-clear">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                            <g fill="#C8C8C8" fill-rule="evenodd">
                                <path d="M.05 1.464L1.464.05 9.95 8.536 8.536 9.95z"/>
                                <path d="M1.464 9.95L.05 8.536 8.536.05 9.95 1.464z"/>
                            </g>
                        </svg>
                    </div>

                </div>
            `);
    }

    onRemoveFileHandler = (target, parent) => {
        let id = $(target).data
        $(target).closest('.block-file').find('input[type="file"]').val('');

        $(target).closest('.visual-file-block').remove();

        let siblings = $(parent).find('.visual-file-block');

        if (siblings.length === 0) {
            $(parent).closest('.block-file').find('.block-file-result').removeClass('block-file-result-filled');
        }

    }


    uploadOnClickHandler = (event) => {
        event.preventDefault();

        $(event.currentTarget).closest('div').find('input[type="file"]').each((index, item) => {
            if ($(item).val() == '') {
                $(item).click();

                return false;
            }
        })
    }

    uploadFileHandler = (event) => {
        var input = event.target;
        var reader = new FileReader();

        let callback = (target, obj) => {
            this.buildVisualFile(target, obj);

            $(target).closest('.block-file').find('.block-file-result').addClass('block-file-result-filled');
        }

        if (input.files && input.files[0]) {

            reader.onload = function (e) {

            callback(input, {
                name: input.files[0].name,
                size: input.files[0].size
            })




            };
            reader.readAsDataURL(input.files[0]);
        }
    }


    setOpenedTip = (id) => {
        const { setOpenedTip } = this.props;
        setOpenedTip(id);
    }



    render() {

        const {uploadedUserPhoto, uploadPhoto, removePhoto} = this.props;

        return (
            <Wrapper className="Verification__personData">
                <Title>Legal Person Data</Title>
                <InputSet>
                    <input type="hidden" name='type' value='LEGAL'/>
                    <InputWrapper>

                        <FinalFormField placeholder="Your business name" labelText="Business name" name="business_name" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your registration number" labelText="Registration number" name="registration_number" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Year - month - day" 
                                        labelText="Date of registration" 
                                        name="registration_date" 
                                        required 
                                        type="date"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your phone number"  labelText="Phone number" options={{numericOnly: true, prefix:'+', noImmediatePrefix: true}} name="phone_number" required/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your director first name" labelText="First name of director" name="director_firstname" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your director last name" labelText="Last Name of director" name="director_lastname" required options={{delimiter: ''}}/>
                    </InputWrapper>

                    <div className="block-file">
                        <p className="text">Basis for representation</p>
                        <ButtonWrapper>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <input type="file" name='basis_doc' onChange={this.uploadFileHandler} hidden/>
                            <Button clickHandler={this.uploadOnClickHandler} text="Attach file"/>
                        </ButtonWrapper>
                        <div className="block-file-result">
                            <p className="files-head">Uploaded:</p>
                        </div>
                    </div>


                    <InputWrapper>

                        <FinalFormField placeholder="Your email" labelText="Email" name="email" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your address" labelText="Address" name="address" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your field of activity" labelText="Field of activity" name="field_of_activity" required options={{delimiter: ''}}/>
                    </InputWrapper>
                </InputSet>

                <InputSet>
                    <SubTitle><span onClick={this.setOpenedTip.bind(this, 2)}>Beneficial owner</span> data</SubTitle>
                    <InputWrapper>
                        <FinalFormField placeholder="Your name" labelText="Name" name="beneficial_fullname" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your personal identification code" labelText="Personal identification code" name="beneficial_personal_id" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Your place of birth" labelText="Place of birth" name="beneficial_place_of_birth" required options={{delimiter: ''}}/>
                    </InputWrapper>
                    <InputWrapper>
                        <FinalFormField placeholder="Year - month - day" 
                                        labelText="Date of birth" 
                                        name="beneficial_birthdate" 
                                        required
                                        type="date"/>
                    </InputWrapper>
                    <InputWrapper fullWidth>
                        <FinalFormField placeholder="Your place of residence of the beneficial owner(s)" labelText="Place of residence of the beneficial owner(s)" name="beneficial_place_of_residence" required options={{delimiter: ''}}/>
                    </InputWrapper>
                </InputSet>

                <RadioSet>
                    <p className="text">
                        Is the representative or any beneficial owner a politically exposed person (PEP), 
                        family member of PEP or person known to be close associate of PEP
                    </p>
                    <FinalFormRadio name="is_pep" options={['Yes', 'No']} values={["True", "False"]}/>
                </RadioSet>


            </Wrapper>
        )
    }
};


const mapStateToProps = ({ICOInfo, Timer, KYC}) => ({
    userPhoto: KYC.get('user_photo'),
    documentPhoto: KYC.get('document_photo'),
    uploadedUserPhoto: KYC.get('uploaded_user_photo')
})

const mapDispatchToProps = (dispatch) => ({
    updateKycData() {
        dispatch(KYCActions.submitKYCRequest())
    },
    uploadPhoto(payload) {
        dispatch(KYCActions.uploadPhoto(payload))
    },
    removePhoto(payload) {
        dispatch(KYCActions.removePhoto(payload))
    },
    setOpenedTip(id) {
        dispatch(UIActions.setOpenedTip(id))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(LegalPersonData)


const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 42px 50px 42px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    .block-file {
        flex-basis: 100%;
        z-index: 0;
    }
    .block-file-result {
        display: none;
    }
    .block-file-result-filled {
        margin-bottom: 35px;
        border-bottom: solid 1px rgba(151, 151, 151,.25);
        display: block;
        overflow: auto;
        .files-head {
            margin-bottom: 13px;
        }
        .visual-file-block {
            display: block; 
            float: left; 
            clear: left; 
            font-size: 16px;
            height: 36px;
            line-height: 36px;
            min-width: 280px;
            background: #f5f5f5;
            padding: 0 40px 0 13px;
            margin-bottom: 5px;
            position: relative
            &:last-of-type {
                margin-bottom: 40px;
            }
            .file-name {
                color: #5c8df5;
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            .file-size {
                color: #000000;
                font-weight: 400; 
            }
            .file-clear {
                position: absolute;
                top: 50%;
                right: 13px;
                transform: translateY(-50%);
                cursor: pointer;
                padding: 0 5px;
                svg {
                    pointer-events: none;
                }
            }
        }
    }
`;

const Title = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 45px;
`;

const SubTitle = styled.h4`
    font-size: 16px;
    color: #0a0a0a;
    letter-spacing: 0.5px;
    flex-basis: 100%;
    margin-bottom: 30px;
    span {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const DescHead = styled.h4`
    position: absolute;
    left: 0;
    top: 0;
    color: #0a0a0a;
    font-weight: 500;
    flex-basis: 100%;
    @media (max-width: 1300px) {
        text-align: center
        width: 100%;
    }
`;

const InputSet = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(151,151,151,.25);
    margin-bottom: 40px;
`;

const RadioSet = styled.div`
    .text {
        font-size: 16px;
        color: #0a0a0a;
        letter-spacing: 0.5px;
        line-height: 1.44;
        margin-bottom: 15px;
    }
`;

const InputWrapper = styled.div`
    height: 45px;
    flex-basis: ${props => props.fullWidth ? '100%' : '48%'};
    
    &:not(:last-child) {
        margin-bottom: 70px;
    }
    &:last-child {
        margin-bottom: 40px;
    }
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 50px;
    margin-top: 15px;
`;