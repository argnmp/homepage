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
   category: {
       categoryData: {
           "profile": false,
       }
   },
   page: {
       currentPage: 'index',
       currentPageMetadata: pageMetadata, 
   }
}

export default preloadedState;