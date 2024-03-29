import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'

import {media} from 'js/utils/media';
import getValidationSchema from 'js/utils/getValidationSchema';

import { Formik, Field, Form } from "formik";
import Button from 'js/components/common/Button';
import ErrorMessage from 'js/components/common/ErrorMessage';
import AttachedFileRenderer from 'js/components/common/AttachedFileRenderer';
import CreateFileAttacher from 'js/components/common/CreateFileAttacher';

import * as TicketActions from 'js/actions/TicketActions';
import * as FilesActions from 'js/actions/FilesActions';
import * as UIActions from 'js/actions/UIActions';


class NewCommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attacherReady: false
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                attacherReady: true
            }
        })
    }

    onSubmitHandler = (values, {resetForm}) => {
        const form = document.querySelector('.NewCommentForm');
        const formData = new FormData(form);

        this.props.createNewComment(formData);
        resetForm({});
    };

    render() {
        const {selectedTicket, commentFiles, addCommentFile, removeCommentFile, isSubmitting, showModal} = this.props;
        const ButtonAttacher = CreateFileAttacher(Button)

        return (
            <Wrapper>
                <Formik
                    initialValues={{
                        comment: ''
                    }} 
                    validationSchema={getValidationSchema('newComment')}
                    onSubmit={this.onSubmitHandler} 
                    render={({errors, touched, values}) => (
                        <Form className="NewCommentForm" encType='multipart/form-data'>
                            <input type="hidden" name={'ticket'} value={selectedTicket.id}/>

                            <FormGroup>
                                <CommentField component="textarea"
                                    className={errors.comment && touched.comment && "isInvalid"}  
                                    value={values.comment || ''} 
                                    placeholder="Your message here..." 
                                    name="comment"
                                />
                                {errors.comment && touched.comment && <ErrorMessage text={errors.comment}/>}
                            </FormGroup>

                            <div className="controls-container files-section files-section-comment">
                                {commentFiles.size > 0 && <div className="files-header">Uploaded:</div>}
                                <div className="files-container" ref={fileWrapper => this.fileWrapper = fileWrapper}>
                                    <input className="file-input" type="file" name='attachment' hidden/>
                                    <AttachedFileRenderer files={commentFiles} removeFileHandler={removeCommentFile} removable={true}/>
                                </div>
                                <div className="buttons-container">
                                    <div className="button-wrapper">
                                    {this.state.attacherReady &&                                     
                                        <ButtonAttacher 
                                                text={'Attach file'} 
                                                attach={true} 
                                                transparent={true} 
                                                name="attachment"
                                                limit={40000000} 
                                                filesToValidate={[commentFiles]}
                                                fileWrapper={this.fileWrapper} 
                                                uploadFileHandler={addCommentFile}
                                                showModal={showModal}
                                                style={{height: 45}}/>
                                    }
                                    </div>
                                    <div className="button-wrapper">
                                        <Button type="submit" text="Send" isSubmitting={isSubmitting} style={{height: 45}}/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                />
            </Wrapper>
        )
    }
}


const mapStateToProps = ({tickets, user, Files}) => ({
    selectedTicket: tickets.get('selectedTicket'),
    commentFiles: Files.get('commentFiles'),
    isSubmitting: tickets.get('isNewCommentSubmitting')
});

const mapDispatchToProps = (dispatch) => ({
    unselectTicket() {
        dispatch(TicketActions.unselectTicket())
    },
    addCommentFile(payload) {
        dispatch(FilesActions.addCommentFile(payload))
    },
    removeCommentFile(payload) {
        dispatch(FilesActions.removeCommentFile(payload))
    },
    createNewComment(payload) {
        dispatch(TicketActions.createNewCommentRequest(payload))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentForm)

const Wrapper = styled.div`
    padding: 0 0 0;
    background: white;
    border-radius: 6px;
    ${media.xs} {
        padding: 35px 0 0;
    }
    .files-header {
        font-size: 14px;
        margin-bottom: 14px;
        ${media.smPlus} {
            display: none;
        }
        ${media.xs} {
            margin-top: 8px;
        }
    }
    .files-container {
        overflow: auto;
        ${media.smPlus} {
            float: left;
        }
        ${media.xs} {
            margin-bottom: 10px;
        }
    }
    .buttons-container {
        ${media.smPlus} {
            float: right;
        }
        ${media.smPlus} {
            display: flex;
        }
    }
    .button-wrapper {
        display: inline-block;
        ${media.xs} {
            width: 100% !important;
        }
        &:first-of-type {
            width: 190px;
            margin-right: 12px;
            ${media.xs} {
                margin-bottom: 15px;
                margin-right: 0;
            }
        }
        &:last-of-type {
            width: 165px;
        }
    }
`;

const CommentField = styled(Field)`
    display: block;
    height: 180px;
    width: 100%;
    padding: 15px;
    resize: none;
    font-size: 16px;
    background: rgb(246, 246, 246);
    border: solid 1px rgb(214, 223, 230);
    ${media.xs} {
        height: 140px;
    }
    &::placeholder {
        opacity: 0.4;
        font-size: 16px;
        font-weight: 400;
        color: #233539;
    }
    &.isInvalid {
        border-color: rgb(242, 109, 109);
    }
`;

const FormGroup = styled.div`
    position: relative;
    margin-bottom: 40px;
    ${media.xs} {
        margin-bottom: 8px;
    }
`;
