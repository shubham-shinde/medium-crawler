import {data} from './dataPool';
const delay = ms => new Promise(res => setTimeout(res, ms));

export const init = async (req, res, next) => {
    console.log('called');
    await delay(2000)
    console.log('responced');
    
    res.json(data)
    
}