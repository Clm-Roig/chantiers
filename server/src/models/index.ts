import mongoose from 'mongoose';

const db = mongoose.set('strictQuery', true);

export default db;
