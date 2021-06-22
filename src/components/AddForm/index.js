import React from "react";
import { Container } from "./addform.css";
import { connect } from "react-redux";
import { UITYPE } from "../../common/uitype";
import { Input } from "../AddQuestionDialog/addquestiondialog.css";
import { saveQues } from "../../redux/saveanswer/actionTypes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const QuestionForm = (props) => {
    const [submit, setSubmit] = React.useState([]);
    const [name, setName] = React.useState('');
    const [errors, setErrors] = React.useState({})

    return (
        <>
            <ToastContainer />
            <div style={{ width: '70%' }} className="card text-center d-flex m-auto mt-5">
                <div className="card-header">
                    <h2>Create a New Form</h2>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Give your form a name</h5>
                    <p className="card-text">
                        <Input type="text" placeholder="Enter Form Name" id="formname" className="mb-4" onChange={(e) => {
                            if(e.target.value.startsWith(" ")){
                                return 
                            }
                            props.validate(e.target.value)
                            setName(e.target.value);
                        }} />
                        <span style={{ color: 'red' }}>{errors.formName}</span>
                    </p>
                </div>
            </div>
            {/* <Container> */}
            {props.questions.length > 0 &&
                <Container>
                    {props.questions.map((ele, index) => {
                        switch (ele.uitype) {
                            case UITYPE.TEXT:
                                return <div key={index}>
                                    <h4>{ele.question}</h4>
                                    <Input disabled type="text" className="mb-3" id={'element' + index}
                                        onChange={(e) => {
                                            let res = submit;
                                            let flag = false;
                                            res.map(s => {
                                                if (s.question === ele.question) {
                                                    s.answer = e.target.value;
                                                    flag = true;
                                                }
                                            })
                                            flag ? setSubmit(res) : setSubmit((prevState) => [...prevState, {
                                                question: ele.question,
                                                answer: e.target.value,
                                            }]);

                                        }} />
                                </div>
                            case UITYPE.RADIO:
                                return <div key={index} onChange={(e) => {
                                    let res = submit;
                                    let flag = false;
                                    res.map(s => {
                                        if (s.question === ele.question) {
                                            s.answer = e.target.value;
                                            flag = true;
                                        }
                                    })
                                    flag ? setSubmit(res) : setSubmit((prevState) => [...prevState, {
                                        question: ele.question,
                                        answer: e.target.value,
                                    }]);
                                }}>
                                    <h4 className="mt-2">{index + 1} . {ele.question}</h4>
                                    {
                                        ele.options.split("\n").map((option) => {
                                            return <div className="form-check">
                                                <input className="form-check-input" disabled type="radio"
                                                    name={"element" + index}
                                                    id={"element" + index} value={option} />
                                                <label className="form-check-label" htmlFor={"element" + index}>
                                                    {option}
                                                </label>
                                            </div>
                                        })
                                    }
                                </div>

                            case UITYPE.CHK:
                                return <div key={index} onChange={(e) => {
                                    let res = submit;
                                    let flag = false;
                                    res.map(s => {
                                        if (s.question === ele.question) {
                                            if (e.target.checked) {
                                                s.answer = s.answer + ", " + e.target.value;
                                            }
                                            else {
                                                let answers = s.answer.split(", ");
                                                let answers_ = [];
                                                answers.map((ele, n_) => {
                                                    if (ele !== e.target.value) {
                                                        answers_.push(answers[n_]);
                                                    }
                                                });
                                                let new_ = "";
                                                answers_.map(ele => {
                                                    new_ = new_ === "" ? ele !== "" && (new_ + ele) : (new_ + ", " + ele);
                                                })
                                                s.answer = new_;
                                            }
                                            flag = true;
                                        }
                                    })
                                    flag ? setSubmit(res) : setSubmit((prevState) => [...prevState, {
                                        question: ele.question,
                                        answer: e.target.value,
                                    }]);

                                }}>
                                    <h4 className="mt-2">{index + 1} . {ele.question}</h4>
                                    {
                                        ele.options.split("\n").map((option) => {
                                            return <div className="form-check">
                                                <input className="form-check-input" disabled type="checkbox"
                                                    value={option} id={"element" + index} />
                                                <label className="form-check-label" htmlFor={"element" + index}>
                                                    {option}
                                                </label>
                                            </div>
                                        })
                                    }
                                </div>

                        }
                    })}

                    <div className="text-center">
                        <a onClick={(e) => {
                            if (!name) {
                                let errors = {}
                                errors["formName"] = "Form name is required."
                                setErrors(errors)
                            } else {
                                console.log(props.questions)
                                props.saveQues({
                                    questions: props.questions,
                                    responses: [],
                                    formname: name
                                });
                            }
                        }} className="btn btn-primary text-center">Save Form</a>
                    </div>
                </Container>
            }
            {/* </Container> */}
            <br />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        questions: state.questionReducer,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveQues: (data) => {
            dispatch(saveQues(data, ownProps));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);