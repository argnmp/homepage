import Image from '../models/imageModel';

//make 'isTemp' field of image to false and delete all 'isTemp' of true images;
export const imageStateChangeAndDelete = async (htmlData) => {
    let targetImageUris = htmlData.match(/(?<=<img src="\/api\/image\/)(.*?)(?=")/g);
    await Promise.all(targetImageUris.map((uri)=>(
        Image.updateOne({uri:uri},{isTemp: false})
    )))
    await Image.deleteMany({isTemp: true});
    console.log('imageStateChange and Delete complete');
} 
//change 'isTemp' field of image from false to true;
export const imageStateRestore = async (htmlData) => {

}
