let preloadedState = {
    category: {
        categoryData: {
            categoryList: {
                "profile": false,
                "tech documents": {
                    "cpp": true,
                    "javascript": true,
                    "nodejs": true,
                    "reactjs": true,
                    "apple": true,
                    "banana": true,
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
                documents: 12,
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
    page: {
        currentPage: 'upload',
        currentPageMetadata: {
            orgUri:'',
        },
        currentPageData: '',
    },
    user: {
        isLogined: true,
        _id: 1232,
        name: "김태현",
        level: 0,
    },
}

export default preloadedState;