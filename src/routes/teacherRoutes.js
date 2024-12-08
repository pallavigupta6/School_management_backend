import express from 'express';
import { teacherController } from '../controllers/teacherController.js';
import { validateTeacher } from '../middleware/validators/teacherValidator.js';

const router = express.Router();

router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.post('/', validateTeacher, teacherController.createTeacher);
router.put('/:id', validateTeacher, teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

export default router;