import Image from '../models/imageModel';

//make 'isTemp' field of image to false and delete all 'isTemp' of true images;
export const imageStateChangeAndDelete = async (htmlData) => {
    try {
        let targetImageUris = htmlData.match(/(?<=<img src="\/api\/image\/)(.*?)(?=")/g);
        if(targetImageUris){
            await Promise.all(targetImageUris.map((uri)=>(
                Image.updateOne({uri:uri},{isTemp: false})
            )))
        }
        await Image.deleteMany({isTemp: true});
        console.log('imageStateChange and Delete complete');
    } catch (e) {
        console.log(e);     
        console.log('imageStateChange and Delete failed');
    }
} 
//change 'isTemp' field of image from false to true;
export const imageStateRestore = async (htmlData) => {
    try {
        let targetImageUris = htmlData.match(/(?<=<img src="\/api\/image\/)(.*?)(?=")/g);
        if(targetImageUris){
            await Promise.all(targetImageUris.map((uri)=>(
                Image.updateOne({uri:uri},{isTemp: true})
            )))
        }
        
        console.log('imageStateRestore complete');
    } catch (e) {
        console.log(e);     
        console.log('imageStateRestore failed');
    }
}
export const imageDelete = async (htmlData) => {
    try {
        let targetImageUris = htmlData.match(/(?<=<img src="\/api\/image\/)(.*?)(?=")/g);
        if(targetImageUris){
            await Promise.all(targetImageUris.map((uri)=>(
                Image.deleteOne({uri:uri})
            )))
        }
        console.log('imageDelete complete');
    } catch (e) {
        console.log(e);     
        console.log('imageDelete failed');
    }

}
