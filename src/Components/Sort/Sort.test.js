import React from 'react';
import renderer from 'react-test-renderer';
import Sort from './index'

describe('Sort describe block', () => {
    const propItems ={
        sortByTerm: 'title',
        sortOrderTerm: 'asc',
        onSortButtonClick: jest.fn(),
    }
    let component;

    beforeEach(()=>{
        component = renderer.create(<Sort {...propItems} />)
    })

    it('Correct Number of Buttons',()=>{
        expect(component.root.findAllByType('button').length).toEqual(4);
    })

    it('On sort Button Click',()=>{
        component.root.findAllByType('button')[0].props.onClick();

        expect(propItems.onSortButtonClick).toHaveBeenCalledTimes(1);
        expect(propItems.onSortButtonClick).toHaveBeenCalledWith('title');
    })

    test('renders snapshot',async ()=>{
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      })
})
