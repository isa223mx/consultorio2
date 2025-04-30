import { getConnection } from "../models/connectionMongo.js"; 
export const getPacienteIdByName = async (req, res) => {
  try {
    const { nombre } = req.params;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre del paciente es requerido" });
    }

    const database = await getConnection();

    // Buscar el paciente por nombre en la colección 'pacientes'
    const paciente = await database.collection('pacientes').findOne({ nombre });

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({ pacienteId: paciente._id });
  } catch (error) {
    console.error("Error en getPacienteIdByName", error);
    res.status(500).json({ message: "Error al obtener el ID del paciente", error: error.message });
  }
};
export const addCompleteData = async (req, res) => {
  try {
    const { nombrePaciente, numNota, motivos, exploracionFisica, diagnostico, tratamiento } = req.body;

    // Validar que el nombre del paciente esté presente
    if (!nombrePaciente) {
      return res.status(400).json({ message: "El nombre del paciente es requerido" });
    }

    // Validar que al menos los datos de la nota estén presentes
    if (!numNota || Object.keys(numNota).length === 0) {
      return res.status(400).json({ message: "El número de nota es requerido" });
    }

    const database = await getConnection();

    // Obtener el ID del paciente utilizando el método getPacienteIdByName
    const paciente = await database.collection('pacientes').findOne({ nombre: nombrePaciente });

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Combinar todos los datos en un solo objeto
    const notaCompleta = {
      pacienteId: paciente._id, // Agregar el ID del paciente
      numNota,
      motivos: motivos || {
        motivoConsulta: motivos?.motivoConsulta || null,
        duracion: motivos?.duracion || null,
        intensidad: motivos?.intensidad || null,
        factoresDesencadenantes: motivos?.factoresDesencadenantes || null,
      },
      exploracionFisica: exploracionFisica?.exploracionFisica || {
        general: exploracionFisica?.general || null,
        cabeza: exploracionFisica?.cabeza || null,
        cuello: exploracionFisica?.cuello || null,
        torax: exploracionFisica?.torax || null,
        abdomen: exploracionFisica?.abdomen || null,
        extremidades: exploracionFisica?.extremidades || null,
      },
      diagnostico: diagnostico?.descripcion || null,
      tratamiento: tratamiento?.indicaciones || null,
      fechaCreacion: new Date() // Agregar una marca de tiempo
    };

    // Insertar el documento completo en la colección 'notas-medicas'
    const result = await database.collection('notas-medicas').insertOne(notaCompleta);

    res.status(201).json({ message: "Nota médica agregada correctamente", notaId: result.insertedId });
  } catch (error) {
    console.error("Error en addCompleteData", error);
    res.status(500).json({ message: "Error al agregar la nota médica", error: error.message });
  }
};