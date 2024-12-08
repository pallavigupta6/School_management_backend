import express from 'express';
import { classController } from '../controllers/classController.js';
import { validateClass } from '../middleware/validators/classValidator.js';

const router = express.Router();

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', validateClass, classController.createClass);
router.put('/:id', validateClass, classController.updateClass);
router.delete('/:id', classController.deleteClass);

export default router;