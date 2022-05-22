const fs = require('fs');
const path = require('path');
import Post from '../models/postModel';

export const categoryBuilder = async (app) => {
    const categoryList = JSON.parse(fs.readFileSync(
        path.resolve(__dirname, '../metadata/category.json')
    ));
    app.set('categoryList', categoryList);
    app.set('categoryCount', {});
    await categoryCountUpdater(app);
    
}
export const categoryCountUpdater = async (app) => {
    const categoryList = app.get('categoryList');
    const categoryCount = app.get('categoryCount');
    await (async function builder (categoryList){
        let acc = 0;
        for(let i in categoryList) {
            if(typeof categoryList[i] === 'object'){
                let accum = await builder(categoryList[i]); 
                categoryCount[i] = accum;
            }
            else {
                if(categoryList[i]===true)
                    acc += categoryCount[i] = await Post.countDocuments({category: {$in: i}});
                else 
                    categoryCount[i] = null;
            }
        }
        return acc;
    })(categoryList);
}