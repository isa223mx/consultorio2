"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Printer, Save } from "lucide-react"

export default function LabRequest() {
  const [selectedPatient, setSelectedPatient] = useState("")

  const labTests = {
    Hematología: [
      "Biometría Hemática Completa",
      "Grupo Sanguíneo y Rh",
      "Tiempo de Protrombina",
      "Tiempo de Tromboplastina",
    ],
    "Química Sanguínea": [
      "Glucosa",
      "Urea",
      "Creatinina",
      "Ácido Úrico",
      "Colesterol Total",
      "Triglicéridos",
      "HDL",
      "LDL",
    ],
    "Pruebas de Función Hepática": [
      "TGO (AST)",
      "TGP (ALT)",
      "Bilirrubina Total",
      "Bilirrubina Directa",
      "Fosfatasa Alcalina",
      "Proteínas Totales",
    ],
    Uroanálisis: ["Examen General de Orina", "Urocultivo"],
    Otros: ["Electrolitos Séricos", "Perfil Tiroideo", "Prueba de Embarazo", "Examen Coproparasitoscópico"],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Solicitud de Estudios de Laboratorio</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            <span>Imprimir</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formato de Solicitud</CardTitle>
          <CardDescription>Complete la información para solicitar estudios de laboratorio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lab-patient">Paciente</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger id="lab-patient">
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1">Paciente Ejemplo 1</SelectItem>
                  <SelectItem value="p2">Paciente Ejemplo 2</SelectItem>
                  <SelectItem value="p3">Paciente Ejemplo 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lab-date">Fecha</Label>
              <Input id="lab-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lab-priority">Prioridad</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="lab-priority">
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lab-diagnosis">Diagnóstico Presuntivo</Label>
            <Input id="lab-diagnosis" placeholder="Diagnóstico presuntivo" />
          </div>

          <div className="space-y-4">
            <Label>Estudios Solicitados</Label>

            <div className="space-y-6">
              {Object.entries(labTests).map(([category, tests]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-medium text-blue-700">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {tests.map((test) => (
                      <div key={test} className="flex items-center space-x-2">
                        <Checkbox id={`test-${test.replace(/\s+/g, "-").toLowerCase()}`} />
                        <Label htmlFor={`test-${test.replace(/\s+/g, "-").toLowerCase()}`} className="font-normal">
                          {test}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lab-notes">Observaciones</Label>
            <Input id="lab-notes" placeholder="Observaciones adicionales" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto flex items-center gap-2">
            <Save size={16} />
            <span>Guardar Solicitud</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
