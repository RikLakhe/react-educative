const appConfig = {
    API_ENDPOINT : 'https://hn.algolia.com/api/v1/search?query=',
    SORT_OPTIONS:[
        {
            key: 'title',
            title: 'Title',
        }, {
            key: 'author',
            title: 'Author',
        }, {
            key: 'points',
            title: 'Points',
        }, {
            key: 'num_comments',
            title: 'Number of Comments',
        }
    ]
}

export default appConfig;