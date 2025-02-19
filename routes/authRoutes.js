import express from 'express';
import { registerUniversity } from '../controller/UniversityController.js';

const route=express.Router();

route.post('/signup/uni',registerUniversity);

export default route;