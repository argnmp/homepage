import postex from './postex';
let preloadedState = {
    category:{
        categoryData: {
            categoryList: {
            "profile":false,
            "documents": {
                "cpp": true,
                "javascript": true,
                "nodejs": true,
                "reactjs": true,
                "apple": true,
                "banana" : true,
                "game": true,
                "world": true,
                "name": true,
                "techtech": true,
                "gamegame": true,
                "dafdaf": true,
                "leaf": true,
            },
            "temp": {
                "hello": true,
                "world": true,
            },
            "daily": true
            },
            categoryCount: {
                profile: null,
                documents : 12,
                cpp: 12,
                javascript: 11,
                nodejs: 0,
                reactjs: 4,
                daily: 39,
                temp: 111,
                hello: 12,
                world: 0,
                apple: 1,
                banana: 100,
                game: 102,
                world: 123,
                name: 234,
                techtech: 123,
                gamegame: 23,
                dafdaf: 34,
                leaf: 1234,
            }
        }
        
    },
    user: {
        isLogined: true,
        _id: 1232,
        name: "김태현",
        level: 0,
    },
    page: {
        currentPage: 'post',
        currentPageData: postex,
        currentPageMetadata: {
            _id: '62393b4fb03766e4b9dcd68d',
            uri: 'decode-ways',
            title: "새로운 블로그를 제작하게 되었습니다",
            author: "kimtahen",
            uploadDate: '2022-03-04 14:53:55',
            views: 40,
            preview: 'fafeislef',
            category: 'os',
            comments: [
                {
                    data: "hello1 world",
                    _id: "faegaegaegae",
                    author: {_id:1234, name: 'kimtahen'},
                    uploadDate: '2022-03-04 14:53:55',
                    childComments: [
                        {
                            data: 'sub comment',
                            author: { _id: 1234, name: 'kimtahen' },
                            uploadDate: '2022-03-04 14:53:55',
                            childComments: [
                                {
                                    data: 'subsubcomment',
                                    author: { _id: 1234, name: 'kimtahen' },
                                    uploadDate: '2022-03-04 14:53:55',
                                    childComments: [
                                        {
                                            data: 'subsubsubcomment',
                                            author: { _id: 1234, name: 'kimtahen' },
                                            uploadDate: '2022-03-04 14:53:55',
                                            childComments: [
                                                {
                                                    data: 'subsubsubsubcomment',
                                                    author: { _id: 1234, name: 'kimtahen' },
                                                    uploadDate: '2022-03-04 14:53:55',
                                                    childComments: [] 
                                                }
                                            ]
                                        }
                                    ],
                                }
                            ] 
                        },
                        {
                            data: 'sub2 comment',
                            author: { _id: 1234, name: 'kimtahen' },
                            uploadDate: '2022-03-04 14:53:55',
                            childComments: [],
                        },
                        {
                            data: 'sub3 comment',
                            author: { _id: 1234, name: 'kimtahen' },
                            uploadDate: '2022-03-04 14:53:55',
                            childComments: [
                                {
                                    data: 'comment from test',
                                    author: {_id: 1232, name: 'test'},
                                    uploadDate: '2022-02-23 11:23:22',
                                    childComments: [],
                                }
                            ],
                        }
                    ]
                },
                {
                    data: "hello2 world",
                    author: {_id:1234, name: 'kimtahen'},
                    uploadDate: '2022-03-04 14:53:55',
                    childComments: [],

                }
            ]
        
        }
    
    }
}

export default preloadedState;