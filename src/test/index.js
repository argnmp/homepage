const pageMetadata = {
    code: 
`use std::fs::File;
use std::io::{self, BufRead};

fn tracks(artist: &str) -> io::Result<io::Lines<io::BufReader<File>>> {
    let album = File::open(artist)?;
    Ok(io::BufReader::new(album).lines())
}
fn main () {    
    if let Ok(computer) = tracks("radiohead.txt") {
        for track in computer {
            if let Ok(title) = track {
                println!("{}", title);
            }
        }
    }
}`,
    output:[
        'Airbag',
        'Paranoid Android',
        'Subterranean Homesick Alien',
        'Exit Music (For a Film)',
        'Let Down',
        'Karma Police',
        'Fitter Happier',
        'Electioneering',
        'Climbing Up the Walls',
        'No Surprises',
        'Lucky',
        'The Tourist',
    ],
    hi:[
        'Ok(computer)',
        'radiohead.txt',
    ],
    emb: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/u5CVsCnxyXg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, 


}
let preloadedState = {
    category:{
        categoryData: {
            categoryList: {
            "profile":false,
            "tech documents": {
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
       currentPage: 'index',
       currentPageMetadata: pageMetadata, 
   }
}

export default preloadedState;