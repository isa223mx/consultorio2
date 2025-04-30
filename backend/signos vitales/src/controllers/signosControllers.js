import { getConnection } from "../models/connectionMySQL.js";

export const getPacienteIdByName = async (req, res) => {
  try {
    const { nombre } = req.params;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre del paciente es requerido" });
    }

    const connection = await getConnection();

    // Buscar el paciente por nombre en la tabla 'pacientes'
    const [rows] = await connection.execute(
      "SELECT id FROM pacientes WHERE nombre = ?",
      [nombre]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    res.status(200).json({ pacienteId: rows[0].id });
  } catch (error) {
    console.error("Error en getPacienteIdByName", error);
    res.status(500).json({ message: "Error al obtener el ID del paciente", error: error.message });
  }
};

export const addCompleteData = async (req, res) => {
  try {
    const { nombrePaciente, numNota, motivos, exploracionFisica, diagnostico, tratamiento } = req.body;

    if (!nombrePaciente) {
      return res.status(400).json({ message: "El nombre del paciente es requerido" });
    }

    if (!numNota) {
      return res.status(400).json({ message: "El número de nota es requerido" });
    }

    const connection = await getConnection();

    // Obtener el ID del paciente por nombre
    const [pacienteRows] = await connection.execute(
      "SELECT id FROM pacientes WHERE nombre = ?",
      [nombrePaciente]
    );

    if (pacienteRows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const pacienteId = pacienteRows[0].id;

    // Insertar los datos en la tabla 'notas_medicas'
    const [result] = await connection.execute(
      `INSERT INTO notas_medicas 
      (paciente_id, num_nota, motivos, exploracion_fisica, diagnostico, tratamiento, fecha_creacion) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        pacienteId,
        numNota,
        JSON.stringify(motivos || {}),
        JSON.stringify(exploracionFisica || {}),
        diagnostico || null,
        tratamiento || null,
        new Date()
      ]
    );

    res.status(201).json({ message: "Nota médica agregada correctamente", notaId: result.insertId });
  } catch (error) {
    console.error("Error en addCompleteData", error);
    res.status(500).json({ message: "Error al agregar la nota médica", error: error.message });
  }
};