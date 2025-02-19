import express from 'express';
import { getCertificate, loginUniversity, registerUniversity, uploadCertificate } from '../controller/UniversityController.js';
import { loginStud, registerStud } from '../controller/StudentController.js';
import { RequireSignIn } from '../controller/AuthMiddleware.js';
const route=express.Router();

route.post('/signup/uni',registerUniversity);
route.post('/signin/uni',loginUniversity);
route.post('/signup/stud',registerStud);
route.post('/signin/stud',loginStud);

route.post('/certificate',uploadCertificate);
route.get('/certificate',getCertificate);

route.get('/uni-auth', RequireSignIn, (req,res) => {
    return res.status(200).send({ok:true})
});


export default route;