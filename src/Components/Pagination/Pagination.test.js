import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from './index'

describe('Pagination describe block', () => {
    const propItem={
        pageNumber: 1,
        onPaginationButtonClick: jest.fn(),
    }

    let component;

    beforeEach(()=>{
        component = renderer.create(<Pagination {...propItem} />)
    })

    it('displays correct pagenumber',()=>{
        expect(component.root.findByType('span').props.children).toEqual(2)
    })

    it('On next page button click',()=>{
        component.root.findAllByType('button')[1].props.onClick();

        expect(propItem.onPaginationButtonClick).toHaveBeenCalledTimes(1);
        expect(propItem.onPaginationButtonClick).toHaveBeenCalledWith(1);
    })

    it('On next page button click',()=>{
        component.root.findAllByType('button')[0].props.onClick();

        expect(propItem.onPaginationButtonClick).toHaveBeenCalledTimes(1);
        expect(propItem.onPaginationButtonClick).toHaveBeenCalledWith(-1);
    })

    test('renders snapshot',async ()=>{
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })
})
