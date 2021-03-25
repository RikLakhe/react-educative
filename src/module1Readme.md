# Changes

Solution Review: Remember Last Searches
Don’t use a new state for this feature. Instead, reuse the url state and setUrl state updater function to fetch stories from the API. Adapt them to multiple urls as state, and to set multiple urls with setUrls. The last URL from urls can be used to fetch the data, and the last five URLs from urls can be used to display the buttons.

First, we will refactor all url to urls state and all setUrl to setUrls state updater functions. Instead of initializing the state with a url as a string, make it an array with the initial url as its only entry:
Second, instead of using the current url state for data fetching, use the last url entry from the urls array. If another url is added to the list of urls, it is used to fetch data instead:
And third, instead of storing url string as state with the state updater function, concat the new url with the previous urls in an array for the new state:
With each search, another URL is stored in our state of urls. Next, render a button for each of the last five URLs. We’ll include a new universal handler for these buttons, and each passes a specific url with a more specific inline handler:
Next, instead of showing the whole URL of the last search in the button as button text, show only the search term by replacing the API’s endpoint with an empty string:
The getLastSearches function now returns search terms instead of URLs. The actual searchTermis passed to the inline handler instead of the url. By mapping over the list of urls in getLastSearches, we can extract the search term for each url within the array’s map method. Making it more concise, it can also look like this:
Now we’ll provide functionality for the new handler used by every button, since clicking one of these buttons should trigger another search. Since we use the urls state for fetching data, and since we know the last URL is always used for data fetching, concat a new url to the list of urls to trigger another search request:
If you compare this new handler’s implementation logic to the handleSearchSubmit, you may see some common functionality. Extract this common functionality to a new handler and a new extracted utility function:
The new utility function can be used somewhere else in the App component. If you extract functionality that can be used by two parties, always check to see if it can be used by a third party.
The functionality should work, but it complains or breaks if the same search term is used more than once, because searchTerm is used for each button element as key attribute. Make the key more specific by concatenating it with the index of the mapped array.
It’s not the perfect solution, because the index isn’t a stable key (especially when adding items to the list; however, it doesn’t break in this scenario. The feature works now, but you can add further UX improvements by following the tasks below.

This feature wasn’t an easy one. Lots of fundamental React but also JavaScript knowledge was needed to accomplish it. If you had no problems implementing it yourself or to follow the instructions, you are very well set. If you had one or the other issue, don’t worry too much about it. Maybe you even figured out another way to solve this task and it may have turned out simpler than the one I showed here.

Challenge: Avoiding Duplicates
(1) Do not show the current search as a button, only the five preceding searches.
(2) Don’t show duplicated searches. Searching twice for “React” shouldn’t create two different buttons.
(3) Set the SearchForm component’s input field value with the last search term if one of the buttons is clicked.

The source of the five rendered buttons is the getLastSearches function. There, we take the array of urls and return the last five entries from it. Now we’ll change this utility function to return the last six entries instead of five, removing the last one. Afterward, only the five previous searches are displayed as buttons.
If the same search is executed twice or more times in a row, duplicate buttons appear, which is likely not your desired behavior. It would be acceptable to group identical searches into one button if they followed each other. We will solve this problem in the utility function as well. Before separating the array into the five previous searches, group the identical searches:
The reduce function starts with an empty array as its result. The first iteration concats the searchTerm we extracted from the first url into the result. Every extracted searchTerm is compared to the one before it. If the previous search term is different from the current, concat the searchTerm to the result. If the search terms are identical, return the result without adding anything.

Lastly, the SearchForm’s input field should be set with the new searchTerm if one of the last search buttons is clicked. We can solve this using the state updater function for the specific value used in the SearchForm component.
Last, extract the feature’s new rendered content from this section as a standalone component, to keep the App component lightweight:

Paginated Fetch
Searching for popular stories via Hacker News API is only one step towards a fully-functional search engine, and there are many ways to fine-tune the search. Take a closer look at the data structure and observe how the Hacker News API returns more than a list of hits.

Specifically, it returns a paginated list. The page property, which is 0 in the first response, can be used to fetch more paginated lists as results. You only need to pass the next page with the same search term to the API.

The following shows how to implement a paginated fetch with the Hacker News data structure. If you are used to pagination from other applications, you may have a row of buttons from 1-10 in your mind – where the currently selected page is highlighted 1-[3]-10 and where clicking one of the buttons leads to fetching and displaying this subset of data.

In contrast, we will implement the feature as infinite pagination. Instead of rendering a single paginated list on a button click, we will render all paginated lists as one list with one button to fetch the next page. Every additional paginated list is concatenated at the end of the one list.

Rather than fetching only the first page of a list, extend the functionality for fetching succeeding pages. Implement this as an infinite pagination on button click.

First, extend the API constant so it can deal with paginated data later. We will turn this one constant:
Into a composable API constant with its parameters:
Fortunately, we don’t need to adjust the API endpoint, because we extracted a common getUrl function for it. However, there is one spot where we must address this logic for the future:

In the next steps, it won’t be sufficient to replace the base of our API endpoint, which is no longer in our code. With more parameters for the API endpoint, the URL becomes more complex. It will change from X to Y:

https://hn.algolia.com/api/v1/search?query=react&page=0

It’s better to extract the search term by extracting everything between ? and &. Also consider that the query parameter is directly after the ? and all other parameters like page follow it

The key ( query=) also needs to be replaced, leaving only the value (searchTerm):

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

// careful: notice the ? and & in between
const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;