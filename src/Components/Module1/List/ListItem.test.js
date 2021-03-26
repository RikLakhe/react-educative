import React from 'react';
import renderer from 'react-test-renderer';
import ListItem from './ListItem'

describe('ListItem Describe Block', () => {
    const item = {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    };
    const handleRemoveItem = jest.fn();
    let component;

    beforeEach(()=>{
        component = renderer.create(
            <ListItem item={item} onRemoveItem={handleRemoveItem} />
          );
    })

    it('renders all properties', () => {
        expect(component.root.findByType('a').props.href).toEqual(
          'https://reactjs.org/'
        );

        expect(
            component.root.findAllByType('span')[1].props.children
          ).toEqual('Jordan Walke');

          expect(
            component.root.findAllByType('span')[2].props.children
          ).toEqual(3);

          expect(
            component.root.findAllByType('span')[3].props.children
          ).toEqual(4);
      });


      it('calls onRemoveItem on button click', () => {    
        component.root.findByType('button').props.onClick();
        expect(handleRemoveItem).toHaveBeenCalledTimes(1);
        expect(handleRemoveItem).toHaveBeenCalledWith(item);
    
        expect(component.root.findAllByType(ListItem).length).toEqual(1);
      });

      test('renders snapshot',()=>{
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      })
});