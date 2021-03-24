import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import appConfig from './appConfig'
import useSemiPersistentState  from './CustomHooks/useSemiPresistentState';
import List from './Components/List';
import SearchForm from './Components/SearchForm';
import Sort from './Components/Sort';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'STORIES_SORT':
      return {
        ...state,
        data: _.orderBy(state.data,[action.payload.sortBy],[action.payload.sortOrder])
      };
    case 'STORIES_SORT_RESET':
        return {
          ...state,
          data: _.orderBy(state.data,['points'],['asc'])
        };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = React.useState(
    `${appConfig.API_ENDPOINT}${searchTerm}`
  );
  const [sortByTerm, setSortByTerm] =  React.useState(
    undefined
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    setUrl(`${appConfig.API_ENDPOINT}${searchTerm}`);
    setSortByTerm(undefined);
    event.preventDefault();
  };

  const handleSortButtonClick = item =>{
    setSortByTerm(item)
    dispatchStories({
      type: 'STORIES_SORT',
      payload: {sortBy:item, sortOrder:'asc'},
    });
  }

  return (<div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <Sort
        sortByTerm={sortByTerm}
        onSortButtonClick={handleSortButtonClick}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>);
}

export default App;
