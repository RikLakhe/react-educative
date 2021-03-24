import React from 'react';
import renderer from 'react-test-renderer';
import InputWithLabel from './InputWithLabel'

describe('Inputwithlabel describe block',()=>{
    const propItem={
        id: 1,
        value: 'React',
        children: 'test',
        onInputChange: jest.fn()
    };

let component;
    beforeEach(()=>{
component = renderer.create(<InputWithLabel {...propItem} />);
    })

    it('displays correct label',()=>{
        expect(component.root.findByType('label').props.children).toEqual('test')
    })

    it('renders the input field with its value',()=>{
        const value = component.root.findByType('input').props.value;

        expect(value).toEqual('React');
    })

    it('change in input field',()=>{
        component.root.findByType('input').props.onChange({target: 'Redux'});

        expect(propItem.onInputChange).toHaveBeenCalledTimes(1);
        expect(propItem.onInputChange).toHaveBeenCalledWith({target: 'Redux'})
    })

    test('renders snapshot',()=>{
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      })
})