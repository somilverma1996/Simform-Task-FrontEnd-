// import 'jsdom-global/register';
import React from 'react';
import { ADD_QUESTION } from "../../redux/questions/actions";
import QuestionForm from "./index";
import { configure, shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { Provider } from "react-redux";
import { cleanup, waitFor, render } from '@testing-library/react';
import store from "../../redux/store/index";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Questions', () => {
    it('render questions ', () => {
        shallow(
            <Provider store={store}>
                <QuestionForm />
            </Provider>
        )
    });
    it("renders Account header", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <QuestionForm />
            </Provider>
        );
        const welcome = <div style={{ width: '70%' }} class="card text-center d-flex m-auto mt-5"></div>;
        expect(wrapper.contains(welcome)).toEqual(false);
    });
    it('render Uis ', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <QuestionForm>
                    <h2>Create a New Form</h2>
                </QuestionForm>
            </Provider>
        );
        expect(wrapper.contains(<h2>Create a New Form</h2>)).toBe(true)
    });
    describe("Matches the component snapshot made ", () => {
        it("must call the mock method with button click", () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <QuestionForm id="btnSubmit" />
                </Provider>
            );
            let w = wrapper.find('#btnSubmit').hostNodes()
            expect(toJson(w)).toMatchSnapshot();

        });
    });




    it('simulates click events', () => {
        const button = shallow(
            <Provider store={store}>
                <QuestionForm>
                    <a id="btnSubmit">Submit</a>
                </QuestionForm>
            </Provider>
        );
        button.find('#btnSubmit').simulate('click');
    });

    describe('when clicking the `submit` button', () => {
        let data = {
            questions_id: "60d0a798482b46ad87012155",
            questions: [{
                answers: "2, 1, 3",
                question: "Ques 1"
            }]
        }
        const mockSubmit = jest.fn();

        const props = {
            submitData: mockSubmit
        };
        const wrapper = shallow(
            <Provider store={store}>
                <QuestionForm>
                    <a id="btnSubmit" {...props}></a>
                </QuestionForm>
            </Provider>
        );

        beforeEach(() => {
            wrapper.find('#btnSubmit').simulate('click');
        });

        it('renders the `submit` button', () => {
            expect(wrapper.find('#btnSubmit').length).toBe(1);
        });

    });


})


