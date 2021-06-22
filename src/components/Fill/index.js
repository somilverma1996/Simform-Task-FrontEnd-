import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, SubmitButton } from "./index.css";
import { UITYPE } from "../../common/uitype";
import { Input } from "../AddQuestionDialog/addquestiondialog.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormFilling = (props) => {
    const [questions, setQuestions] = useState([]);
    const [submit, setSubmit] = useState([]);
    const [formname, setFormname] = useState('');
    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios.post(`${process.env.REACT_APP_URL}questions/getById`, {
            "questions_id": props.match.params.id
        }, {
            headers: headers,
        }).then((response) => {
            setFormname(response.data[0].questions.formname);
            setQuestions(response.data[0].questions.questions);
        }).catch((err) => {
        })
    }, []);
    return (
        <>
            <ToastContainer />
            <h2 className="text-center mt-5">Form Details</h2>
            <div class="card d-flex m-auto mt-5" style={{ width: "70%" }}>
                <div class="card-header">
                    <h5>FormName: {formname}</h5>
                </div>
                <div class="card-body">
                    {/* <Container> */}
                    <h6>Questions:</h6><br />
                    {questions.map((ele, index) => {
                        switch (ele.uitype) {
                            case UITYPE.TEXT:
                                return <div key={index}>
                                    <h6>{ele.question}</h6>
                                    <Input type="text" id={'element' + index}
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
                                    <h6 className="mt-2">{ele.question}</h6>
                                    {
                                        ele.options.split("\n").map((option) => {
                                            return <div className="form-check">
                                                <input className="form-check-input" type="radio"
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
                                    <h6 className="mt-2">{ele.question}</h6>
                                    {
                                        ele.options.split("\n").map((option) => {
                                            return <div className="form-check">
                                                <input className="form-check-input" type="checkbox"
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
                    {/* </Container> */}
                </div>
            </div>
            <div className="text-center mt-3">
                <a className="btn btn-primary text-center" onClick={(e) => {
                    const headers = {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    };
                    axios.put(`${process.env.REACT_APP_URL}questions/submitForm`, {
                        "questions_id": props.match.params.id,
                        "questions": submit
                    }, {
                        headers: headers,
                    }).then((res) => {
                        props.history.push("/formlist");
                    });
                }}>Submit</a>
            </div>
        </>
    );
}

export default FormFilling;