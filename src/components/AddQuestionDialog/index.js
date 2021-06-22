import React, { useState } from "react";
import {
    StyledModal, ModalFooter, ModalHeader,
    ModalContent, Cancel, Row, Column, TextArea, Select, Option
} from "./addquestiondialog.css";
import { UITYPE } from "../../common/uitype";
import { connect } from "react-redux";
import { addQues } from "../../redux/questions/actiontypes";
import { Input } from "./addquestiondialog.css";
const Modal = (props) => {
    const { isOpen, afterOpen, beforeClose, toggleModal, opacity, handleQuestionAdded } = props;
    const [questions, setQuestions] = useState({
        question: "",
        uitype: "",
        options: ""
    })
    const [errors, setErrors] = useState({})
    const validateForm = () => {
        console.log(questions)
        let errors = {}, formIsValid = true;
        if (!questions.question) {
            formIsValid = false;
            errors["question"] = "Question is required."
        } else {
            errors["question"] = ""
        }

        if (questions.uitype === "") {
            formIsValid = false;
            errors["uitype"] = "Please select atleast one option."
        } else {
            errors["uitype"] = ""
        }

        if (questions.uitype !== 0) {
            if (!questions.options) {
                formIsValid = false;
                errors["options"] = "Please enter value of option in separate lines"
            } else {
                errors["options"] = ""
            }
        }
        setErrors(errors)

        return formIsValid;
    }

    return (
        <StyledModal
            isOpen={isOpen}
            afterOpen={afterOpen}
            beforeClose={beforeClose}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
            opacity={opacity}
            backgroundProps={{ opacity }}
        >
            <ModalHeader>
                <h2 className="text-center" style={{ fontFamily: 'sans-serif' }}>Add  Question</h2>
            </ModalHeader>
            <ModalContent>
                <Row >
                    <Column size={10}>
                        <Input type="text" placeholder="Enter the Question" id="w3review" name="w3review" className="" onChange={(e) => {
                            setQuestions({
                                ...questions, question: e.target.value
                            })
                        }} />
                        <span style={{ color: "red" }}>{errors.question}</span>
                    </Column>
                </Row>
                <br />
                <Row >
                    <Column size={10}>
                        <Select onChange={(e) => {
                            if (e.target.value === 0) {
                                errors["options"] = ""
                            }
                            e.target.value !== "" ? setQuestions({
                                ...questions, uitype: Number(e.target.value)
                            }) : setQuestions({
                                ...questions, uitype: null
                            });
                        }}>
                            <Option value="">Select Question Type</Option>
                            <Option value={UITYPE.TEXT}>Text</Option>
                            <Option value={UITYPE.CHK}>Multichoice Checkbox</Option>
                            <Option value={UITYPE.RADIO}>Single Select Radio</Option>
                        </Select>
                        <span style={{ color: "red" }}>{errors.uitype}</span>
                    </Column>
                </Row>
                {questions.uitype !== '' &&
                    <Row style={{ marginTop: "10px" }}>
                        <Column size={10}>
                            {/* {questions.uitype === UITYPE.TEXT && <h3>Text Box Added for response</h3>} */}
                            {questions.uitype === UITYPE.RADIO && <>
                                <TextArea id="w3review" name="w3review" className="mt-1"
                                    rows={4} cols={50} placeholder={"Enter the options"} onChange={(e) => {
                                        setQuestions({
                                            ...questions, options: e.target.value
                                        })
                                    }}>
                                </TextArea>
                            </>}
                            {questions.uitype === UITYPE.CHK && <>
                                <TextArea id="w3review" name="w3review" className="mt-1"
                                    rows={4} cols={50} placeholder={"Enter the options"} onChange={(e) => {
                                        setQuestions({
                                            ...questions, options: e.target.value
                                        })
                                    }}>
                                </TextArea>
                            </>}
                            <span style={{ color: "red" }}>{errors.options}</span>
                        </Column>
                    </Row>}
                {/* {nonEmpty ? <h3 style={{ color: "red", marginTop: "20px" }}>Kindly fill all details!!</h3> : null} */}
            </ModalContent>
            <ModalFooter>
                <Row>
                    <Column mt={2} style={{ marginRight: "auto" }}>
                        <Cancel onClick={toggleModal}> Cancel </Cancel>
                    </Column>
                    <Column mt={1}>
                        <a class="btn btn-primary text-center mt-2" onClick={() => {
                            if (validateForm()) {
                                console.log(questions)
                                if (questions.question !== "" &&
                                    questions.uitype !== "") {
                                    console.log("here",)
                                    props.addQuestion([...props.questions, {
                                        question: questions.question,
                                        uitype: questions.uitype,
                                        options: questions.options
                                    }]);
                                    toggleModal();
                                    handleQuestionAdded();
                                    setQuestions({
                                        question: "",
                                        uitype: "",
                                        options: ""
                                    });
                                }
                                else {
                                }
                            }
                        }}>
                            <span style={{ fontSize: 16 }}>Add</span>
                        </a>
                    </Column>
                </Row>
            </ModalFooter>
        </StyledModal>
    );
}

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer,
    };
}

const mapDistpatchToProps = (dispatch, ownprops) => {
    return {
        addQuestion: (data) => dispatch(addQues(data)),
    };
}


export default connect(mapStateToProps, mapDistpatchToProps)(Modal);


