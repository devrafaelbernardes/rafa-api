import DataLoader from 'dataloader';

export const loader = (callback) => new DataLoader((ids) => callback(ids))
export default loader;