import express from 'express';
const router = express.Router();
import {
  createWordDocument,
  addPaciente,
  addAntecedentes,
  addExploracionFisica,
  addDiagnostico,
  addTratamiento,
  addNotasEvolucion,
  addMedico
} from '../controllers/histoController.js';

// Rutas para agregar datos individuales
router.post('/paciente', addPaciente);  // URL localhost:3000/historiales/paciente
router.post('/antecedentes', addAntecedentes); // URL localhost:3000/historiales/antecedentes
router.post('/exploracion-fisica', addExploracionFisica); // URL localhost:3000/historiales/exploracion-fisica
router.post('/diagnostico', addDiagnostico); // URL localhost:3000/historiales/diagnostico
router.post('/tratamiento', addTratamiento);  // URL localhost:3000/historiales/tratamiento
router.post('/notas-evolucion', addNotasEvolucion); // URL localhost:3000/historiales/notas-evolucion
router.post('/medico', addMedico); // URL localhost:3000/historiales/medico

// Ruta para crear un documento Word
router.get('/create-word/:pacienteId', createWordDocument);

export default router;