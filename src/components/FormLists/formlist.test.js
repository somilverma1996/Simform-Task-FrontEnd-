import React from 'react';
import QuestionForm from "./index";
import axios from 'axios';
import { Provider } from "react-redux";
import {  waitFor, render } from '@testing-library/react';
import store from "../../redux/store/index";
import { BrowserRouter as Router } from 'react-router-dom';


it('mocking axios request', async () => {
    const data = {
        data: [
            {
                createdAt: "2021-06-21T08:35:37.850Z",
                formname: "Test",
                questions: [{ question: "Test ques", uitype: 1, label: "", options: "chk 1↵chk 2↵chk 3" }],
                responses: [],
                updatedAt: "2021-06-21T08:35:37.850Z",
                _id: "60d04f5982fd963c58466413"
            },
            {
                createdAt: "2021-06-21T08:35:37.850Z",
                formname: "Test1",
                questions: [{ question: "Test ques1", uitype: 1, label: "", options: "chk 1↵chk 2↵chk 3" }],
                responses: [],
                updatedAt: "2021-06-21T08:35:37.850Z",
                _id: "60d050cf82fd963c58466415"
            }
        ]
    };
    axios.get = jest.fn()
    axios.get.mockResolvedValueOnce(data);
    const { getByText } = render(
        <Provider store={store}>
            <Router>
                <QuestionForm />
            </Router>
        </Provider>
    );
    await waitFor(() => {
        expect(getByText('Test'));
        expect(getByText('Test1'));
    });
});