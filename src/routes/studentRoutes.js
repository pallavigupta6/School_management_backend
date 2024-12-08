import express from 'express';
import { studentController } from '../controllers/studentController.js';
import { validateStudent } from '../middleware/validators/studentValidator.js';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', validateStudent, studentController.createStudent);
router.put('/:id', validateStudent, studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;