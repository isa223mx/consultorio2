"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilePenLine, FileText, Printer, Save } from "lucide-react"

export default function MedicalNote() {
  const [selectedPatient, setSelectedPatient] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Nota Médica</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            <span>Imprimir</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patient">Paciente</Label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger id="patient">
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
          <Label htmlFor="date">Fecha</Label>
          <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <Input id="time" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
        </div>
      </div>

      <Tabs defaultValue="note" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="note" className="flex items-center gap-2">
            <FilePenLine size={16} />
            <span>Nota Médica</span>
          </TabsTrigger>
          <TabsTrigger value="prescription" className="flex items-center gap-2">
            <FileText size={16} />
            <span>Receta</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="note">
          <Card>
            <CardHeader>
              <CardTitle>Nota Médica</CardTitle>
              <CardDescription>Registre la información de la consulta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subjective">Subjetivo (Motivo de consulta)</Label>
                <Textarea
                  id="subjective"
                  placeholder="Describa el motivo de consulta y síntomas referidos por el paciente"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Objetivo (Exploración física)</Label>
                <Textarea
                  id="objective"
                  placeholder="Registre los hallazgos de la exploración física"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessment">Evaluación (Diagnóstico)</Label>
                <Textarea id="assessment" placeholder="Diagnóstico presuntivo o definitivo" className="min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Plan (Tratamiento e indicaciones)</Label>
                <Textarea
                  id="plan"
                  placeholder="Plan de tratamiento e indicaciones para el paciente"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto flex items-center gap-2">
                <Save size={16} />
                <span>Guardar Nota</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prescription">
          <Card>
            <CardHeader>
              <CardTitle>Receta Médica</CardTitle>
              <CardDescription>Genere una receta para el paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 border rounded-md bg-white">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-blue-700">ConsultaMed</h3>
                  <p className="text-sm text-gray-600">Dr. Juan Pérez - Cédula Profesional: 12345678</p>
                  <p className="text-sm text-gray-600">Especialidad: Medicina General</p>
                </div>

                <div className="flex justify-between text-sm mb-6">
                  <div>
                    <p>
                      <strong>Paciente:</strong> {selectedPatient ? "Paciente Ejemplo" : "_______________"}
                    </p>
                    <p>
                      <strong>Edad:</strong> _____ años
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Fecha:</strong> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-bold mb-2">Rx:</p>
                  <Textarea
                    placeholder="Escriba la prescripción médica aquí..."
                    className="min-h-[150px] border-0 focus-visible:ring-0 p-0 text-base"
                  />
                </div>

                <div className="mb-6">
                  <p className="font-bold mb-2">Indicaciones:</p>
                  <Textarea
                    placeholder="Escriba las indicaciones para el paciente..."
                    className="min-h-[100px] border-0 focus-visible:ring-0 p-0 text-base"
                  />
                </div>

                <div className="text-center mt-10">
                  <div className="border-t border-gray-400 w-48 mx-auto pt-2">
                    <p className="font-bold">Firma del Médico</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer size={16} />
                <span>Imprimir Receta</span>
              </Button>
              <Button className="flex items-center gap-2">
                <Save size={16} />
                <span>Guardar Receta</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
