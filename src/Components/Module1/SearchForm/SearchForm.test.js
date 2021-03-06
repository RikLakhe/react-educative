import React from 'react';
import renderer from 'react-test-renderer';
import InputWithLabel from './InputWithLabel'
import SearchForm from './index'

describe('SearchForm describe block', () => {
    const searchFormProps ={
        searchTerm: 'React',
        onSearchInput: jest.fn(),
        onSearchSubmit: jest.fn(),
    }
    let component;

    beforeEach(()=>{
        component = renderer.create(<SearchForm {...searchFormProps} />)
    })

    it('changes the input field', () => {
        const pseudoEvent = { target: 'Redux' };
    
        component.root.findByType('input').props.onChange(pseudoEvent);
    
        expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
        expect(searchFormProps.onSearchInput).toHaveBeenCalledWith(
          pseudoEvent
        );
      });
    
      it('submits the form', () => {
        const pseudoEvent = {};
    
        component.root.findByType('form').props.onSubmit(pseudoEvent);
    
        expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
        expect(searchFormProps.onSearchSubmit).toHaveBeenCalledWith(
          pseudoEvent
        );
      });

      it('disables the button and prevents submit', () => {
        component.update(
          <SearchForm {...searchFormProps} searchTerm="" />
        );
    
        expect(
          component.root.findByType('button').props.disabled
        ).toBeTruthy();
      });

      it('searchForm and inputwithlabel integration test',()=>{
          expect(component.root.findAllByType(InputWithLabel).length).toEqual(1)
      })

      test('renders snapshot',async ()=>{
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      })
})
