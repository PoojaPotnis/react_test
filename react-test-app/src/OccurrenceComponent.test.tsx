import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OccurrenceComponent from './OccurrenceComponent';

const initialState = {
    inputString :"",
    bannedWords :"",
    output :""
};

configure({ adapter: new Adapter() });

describe('<OccurrenceComponent />', () => {
    let wrapper: any;

    it('should match the snapshot', () => {
        wrapper = mount(<OccurrenceComponent/>);
        expect(wrapper.exists()).toBe(true);
    });

    it('Should capture inputString correctly onChange', function(){
        wrapper = mount(<OccurrenceComponent/>);
        const input = wrapper.find('textarea').at(0);
        input.instance().value = 'Input String';
        input.simulate('change');
        expect(wrapper.state().inputString).toEqual('Input String');
    });

    it('Should capture bannedWords correctly onChange', function(){
        wrapper = mount(<OccurrenceComponent/>);
        const input = wrapper.find('textarea').at(1);
        input.instance().value = 'Banned words';
        input.simulate('change');
        expect(wrapper.state().bannedWords).toEqual('Banned words');
    });

    it('Should create output correctly onSubmit', function(){
        wrapper = mount(<OccurrenceComponent/>);
        const inputString = wrapper.find('textarea').at(0);
        inputString.instance().value = "It's okay not to be okay, but it's not okay to be a dumb";
        const bannedWords = wrapper.find('textarea').at(1);
        bannedWords.instance().value = "okay";  
        const expectedArg = "its, not, to, be";
        inputString.simulate('change');
        bannedWords.simulate('change');    
        wrapper.find('form').simulate('submit');
        expect(wrapper.state().output).toEqual(expectedArg);
    });

    it('Should return highest occurrence with no banned words onSubmit', function(){
        wrapper = mount(<OccurrenceComponent/>);
        const inputString = wrapper.find('textarea').at(0);
        inputString.instance().value = "I felt happy because I saw the others were really happy and because I knew I should feel happy";
        const expectedArg = "i";
        inputString.simulate('change');    
        wrapper.find('form').simulate('submit');
        expect(wrapper.state().output).toEqual(expectedArg);
    });

});