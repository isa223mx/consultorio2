import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import expressions from "docxtemplater/expressions.js"; // <<--- Agregado
import { getConnection } from "../models/connectionMongo.js"; 
import { ObjectId } from "mongodb";

// Función para sanear nombres de archivo
const sanitizeFileName = (name) => {
  return name
    .normalize('NFD') 
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_\-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
};

// Función para formatear fecha dd/mm/yyyy
const getFormattedDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

import { getConnection } from "../models/connectionMongo.js";
import { ObjectId } from "mongodb";

// Ruta para agregar datos del paciente
export const addPaciente = async (req, res) => {
  try {
    const { paciente } = req.body;

    if (!paciente || Object.keys(paciente).length === 0) {
      return res.status(400).json({ message: "Los datos del paciente son requeridos" });
    }

    const database = await getConnection();
    const result = await database.collection('pacientes').insertOne(paciente);

    res.status(201).json({ message: "Paciente agregado correctamente", pacienteId: result.insertedId });
  } catch (error) {
    console.error("Error en addPaciente", error);
    res.status(500).json({ message: "Error al agregar paciente", error: error.message });
  }
};

// Ruta para agregar antecedentes
export const addAntecedentes = async (req, res) => {
  try {
    const { antecedentes, pacienteId } = req.body;

    if (!antecedentes || !pacienteId) {
      return res.status(400).json({ message: "Los antecedentes y el ID del paciente son requeridos" });
    }

    const database = await getConnection();
    await database.collection('antecedentes').insertOne({ ...antecedentes, pacienteId: new ObjectId(pacienteId) });

    res.status(201).json({ message: "Antecedentes agregados correctamente" });
  } catch (error) {
    console.error("Error en addAntecedentes", error);
    res.status(500).json({ message: "Error al agregar antecedentes", error: error.message });
  }
};

// Ruta para agregar exploración física
export const addExploracionFisica = async (req, res) => {
  try {
    const { exploracionFisica, pacienteId } = req.body;

    if (!exploracionFisica || !pacienteId) {
      return res.status(400).json({ message: "La exploración física y el ID del paciente son requeridos" });
    }

    const database = await getConnection();
    await database.collection('exploracionFisica').insertOne({ ...exploracionFisica, pacienteId: new ObjectId(pacienteId) });

    res.status(201).json({ message: "Exploración física agregada correctamente" });
  } catch (error) {
    console.error("Error en addExploracionFisica", error);
    res.status(500).json({ message: "Error al agregar exploración física", error: error.message });
  }
};

// Ruta para agregar diagnóstico
export const addDiagnostico = async (req, res) => {
  try {
    const { diagnostico, pacienteId } = req.body;

    if (!diagnostico || !pacienteId) {
      return res.status(400).json({ message: "El diagnóstico y el ID del paciente son requeridos" });
    }

    const database = await getConnection();
    await database.collection('diagnosticos').insertOne({ ...diagnostico, pacienteId: new ObjectId(pacienteId) });

    res.status(201).json({ message: "Diagnóstico agregado correctamente" });
  } catch (error) {
    console.error("Error en addDiagnostico", error);
    res.status(500).json({ message: "Error al agregar diagnóstico", error: error.message });
  }
};

// Ruta para agregar tratamiento
export const addTratamiento = async (req, res) => {
  try {
    const { tratamiento, pacienteId } = req.body;

    if (!tratamiento || !pacienteId) {
      return res.status(400).json({ message: "El tratamiento y el ID del paciente son requeridos" });
    }

    const database = await getConnection();
    await database.collection('tratamientos').insertOne({ ...tratamiento, pacienteId: new ObjectId(pacienteId) });

    res.status(201).json({ message: "Tratamiento agregado correctamente" });
  } catch (error) {
    console.error("Error en addTratamiento", error);
    res.status(500).json({ message: "Error al agregar tratamiento", error: error.message });
  }
};

// Ruta para agregar notas de evolución
export const addNotasEvolucion = async (req, res) => {
  try {
    const { notasEvolucion, pacienteId } = req.body;

    if (!notasEvolucion || !pacienteId) {
      return res.status(400).json({ message: "Las notas de evolución y el ID del paciente son requeridos" });
    }

    const database = await getConnection();
    await database.collection('notasEvolucion').insertOne({ ...notasEvolucion, pacienteId: new ObjectId(pacienteId) });

    res.status(201).json({ message: "Notas de evolución agregadas correctamente" });
  } catch (error) {
    console.error("Error en addNotasEvolucion", error);
    res.status(500).json({ message: "Error al agregar notas de evolución", error: error.message });
  }
};

// Ruta para agregar datos del médico
export const addMedico = async (req, res) => {
  try {
    const { medico, pacienteId } = req.body;

    if (!medico || !pacienteId) {
      return res.status(400).json({ message: "Los datos del médico y el ID del paciente son requeridos" });
    }

    const database = await getConnection();
    await database.collection('medicos').insertOne({ ...medico, pacienteId: new ObjectId(pacienteId) });

    res.status(201).json({ message: "Datos del médico agregados correctamente" });
  } catch (error) {
    console.error("Error en addMedico", error);
    res.status(500).json({ message: "Error al agregar datos del médico", error: error.message });
  }
};
export const createWordDocument = async (req, res) => {
  try {
    // Obtener el ID del paciente desde los parámetros o el cuerpo de la solicitud
    const { pacienteId } = req.params;

    // Validar que se haya proporcionado un ID
    if (!pacienteId) {
      return res.status(400).json({ message: "El ID del paciente es requerido" });
    }

    const database = await getConnection();
    const paciente = await database.collection('pacientes').findOne({ _id: new ObjectId(pacienteId) });
    const antecedentes = await database.collection('antecedentes').findOne({ pacienteId: new ObjectId(pacienteId) });
    const exploracionFisica = await database.collection('exploracionFisica').findOne({ pacienteId: new ObjectId(pacienteId) });
    const diagnostico = await database.collection('diagnosticos').findOne({ pacienteId: new ObjectId(pacienteId) });
    const tratamiento = await database.collection('tratamientos').findOne({ pacienteId: new ObjectId(pacienteId) });
    const notasEvolucion = await database.collection('notasEvolucion').findOne({ pacienteId: new ObjectId(pacienteId) });
    const medico = await database.collection('medicos').findOne({ pacienteId: new ObjectId(pacienteId) });

    // Validar que el paciente exista
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Ruta de la plantilla
    const templatePath = path.join(process.cwd(), "templates", "template.docx");
    if (!fs.existsSync(templatePath)) {
      throw new Error("Plantilla no encontrada");
    }

    // Cargar plantilla
    const templateContent = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(templateContent);

    // Crear el documento con parser de expresiones
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: expressions
    });

    // Datos dinámicos del paciente
    const data = {
      encabezado: {
        institucion: "CLÍNICA EJEMPLO S.A. DE C.V.",
        direccion: "Av. Revolución 123, CDMX",
        telefono: "55 1234 5678"
      },
      datosPaciente: {
        nombre: paciente.nombre || "N/A",
        edad: paciente.edad || "N/A",
        sexo: paciente.sexo || "N/A",
        estadoCivil: paciente.estadoCivil || "N/A",
        ocupacion: paciente.ocupacion || "N/A",
        domicilio: paciente.domicilio || "N/A",
        telefono: paciente.telefono || "N/A",
        fechaNacimiento: paciente.fechaNacimiento || "N/A",
        lugarNacimiento: paciente.lugarNacimiento || "N/A"
      },
      antecedentes:  {
        patologicos: antecedentes.patologicos || "N/A",
        alergicos: antecedentes.alergicos || "N/A",
        quirurgicos: antecedentes.quirurgicos || "N/A",
        traumatismos: antecedentes.traumatismos ||"N/A",
        transfusionales: antecedentes.transfusionales ||"N/A",
        familiares: antecedentes.familiares ||"N/A"
      },
      exploracionFisica: {
        general: exploracionFisica.general ||"N/A",
        cabeza: exploracionFisica.cabeza ||"N/A",
        cuello: exploracionFisica.cuello||"N/A",
        torax:exploracionFisica.torax||"N/A",
        abdomen: exploracionFisica.abdomen|| "N/A",
        extremidades: exploracionFisica.extremidades || "N/A"
      },
      diagnostico: diagnostico?.descripcion || "N/A", 
      tratamiento: tratamiento?.indicaciones || "N/A", 
      notasEvolucion: notasEvolucion?.descripcion || "N/A",
      medico: {
        nombre: medico.nombre || "N/A",
        cedula: medico.cedula|| "N/A",
        contacto: medico.contacto || "N/A"
      }
    };

    // Cargar los datos en la plantilla
    doc.setData(data);

    // Renderizar el documento
    doc.render();

    // Validar que no queden etiquetas sin reemplazar
    const fullText = doc.getFullText();
    if (fullText.includes('undefined')) {
      const missingTags = fullText.match(/{[^}]+}/g) || [];
      throw new Error(`Tags no remplazados: ${missingTags.join(', ')}`);
    }

    // Generar el buffer
    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    // Crear carpeta si no existe
    const outputDir = path.join(process.cwd(), "historiales");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generar nombre seguro de archivo
    const safePatientName = sanitizeFileName(data.datosPaciente.nombre);
    const fileName = `Historial_${safePatientName}_${new Date().toISOString().split('T')[0]}.docx`;
    const outputPath = path.join(outputDir, fileName);

    // Guardar archivo
    fs.writeFileSync(outputPath, buffer);

    // Descargar archivo
    res.download(outputPath, fileName, (err) => {
      if (err) {
        console.error("Error al descargar:", err);
        res.status(500).json({
          message: "Error al enviar el documento",
          error: err.message
        });
      }
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error generando historial clínico",
      details: {
        errorType: error.name,
        errorMessage: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
      }
    });
  }
};
