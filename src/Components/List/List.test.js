import React from 'react';
import renderer from 'react-test-renderer';
import ListItem from './ListItem'
import List from './index'

describe('List Describe block', () => {
    const item = [{
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 1,
    }, {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 2,
    }, {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 3,
    }]
    const handleRemoveItem = jest.fn();
    let component;

    beforeEach(()=>{
        component = renderer.create(
            <List list={item} onRemoveItem={handleRemoveItem} />
          );
    })

    it('Renders 3 items',()=>{
        expect(component.root.findAllByType(ListItem).length).toEqual(3)
    })

    it('calls onRemoveItem on button click', () => {    
        component.root.findAllByType('button')[0].props.onClick();
        component.root.findAllByType('button')[2].props.onClick();
        expect(handleRemoveItem).toHaveBeenCalledTimes(2);
        expect(handleRemoveItem).toHaveBeenCalledWith(item[0]);
    
        expect(component.root.findAllByType(ListItem).length).toEqual(3);
      });

      test('renders snapshot',async ()=>{
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      })

})