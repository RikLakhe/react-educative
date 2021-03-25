import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import appConfig from './appConfig'
import useSemiPersistentState  from './CustomHooks/useSemiPresistentState';
import List from './Components/List';
import SearchForm from './Components/SearchForm';
import Sort from './Components/Sort';
import Pagination from './Components/Pagination';

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
        data:  _.orderBy(action.payload,[action.sortBy],[action.sortOrder]),
        pagination: {pageNumber: action.pageNumber}
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
        data: _.orderBy(state.data,[action.sortBy],[action.sortOrder]),
      };
    case 'STORIES_SORT_RESET':
        return {
          ...state,
          data: _.orderBy(state.data,['title'],['asc'])
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
    `${appConfig.API_ENDPOINT}${appConfig.API_SEARCH}?${appConfig.PARAM_SEARCH}${searchTerm}`
  );

  const [sortByTerm, setSortByTerm] =  useSemiPersistentState(
    'sortBy',
    'title'
  );
  const [sortOrderTerm, setSortOrderTerm] =  useSemiPersistentState(
    'sortOrder',
    'asc'
  );
  const [pagination, setPagination] =  React.useState(0);
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
        sortBy: sortByTerm,
        sortOrder: sortOrderTerm
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
    setUrl(`${appConfig.API_ENDPOINT}${appConfig.API_SEARCH}?${appConfig.PARAM_SEARCH}${searchTerm}&${appConfig.PARAM_PAGE}${pagination}`);
    setSortByTerm(undefined);
    setSortOrderTerm('asc')
    event.preventDefault();
  };

  const handlePaginationButtonClick = increaseNumber => {
    if(pagination === 0){
      if(increaseNumber > 0){
        setPagination(pagination + increaseNumber);
      }
    }else{
      setPagination(pagination + increaseNumber);
    }
    setUrl(`${appConfig.API_ENDPOINT}${appConfig.API_SEARCH}?${appConfig.PARAM_SEARCH}${searchTerm}&${appConfig.PARAM_PAGE}${pagination}`);
  };

  const handleSortButtonClick = item =>{
    if(sortByTerm === item){
      if(sortOrderTerm === 'asc'){
        setSortOrderTerm('desc')
      }else{
        setSortOrderTerm('asc')
      }
    }else{
      setSortByTerm(item)
      setSortOrderTerm('asc')
    }
  
    dispatchStories({
      type: 'STORIES_SORT',
      sortBy: sortByTerm,
      sortOrder: sortOrderTerm
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
        sortOrderTerm={sortOrderTerm}
        onSortButtonClick={handleSortButtonClick}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
<hr />
      {
        stories && stories.data.length > 0 &&
      <Pagination pageNumber={pagination} onPaginationButtonClick={handlePaginationButtonClick}/>
      }
    </div>);
}

export default App;
