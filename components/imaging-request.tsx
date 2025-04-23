"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Printer, Save } from "lucide-react"

export default function ImagingRequest() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedStudy, setSelectedStudy] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Solicitud de Imagenología</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            <span>Imprimir</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formato de Solicitud de Estudios de Imagen</CardTitle>
          <CardDescription>Complete la información para solicitar estudios de imagenología</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="img-patient">Paciente</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger id="img-patient">
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
              <Label htmlFor="img-date">Fecha</Label>
              <Input id="img-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="img-priority">Prioridad</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="img-priority">
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
            <Label htmlFor="img-diagnosis">Diagnóstico Presuntivo</Label>
            <Input id="img-diagnosis" placeholder="Diagnóstico presuntivo" />
          </div>

          <div className="space-y-4">
            <Label>Tipo de Estudio</Label>
            <RadioGroup defaultValue="xray" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="xray" id="xray" />
                <Label htmlFor="xray">Radiografía</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ultrasound" id="ultrasound" />
                <Label htmlFor="ultrasound">Ultrasonido</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ct" id="ct" />
                <Label htmlFor="ct">Tomografía Computarizada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mri" id="mri" />
                <Label htmlFor="mri">Resonancia Magnética</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mammography" id="mammography" />
                <Label htmlFor="mammography">Mamografía</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Otro</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="img-study">Estudio Específico</Label>
            <Select value={selectedStudy} onValueChange={setSelectedStudy}>
              <SelectTrigger id="img-study">
                <SelectValue placeholder="Seleccionar estudio específico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chest">Radiografía de Tórax</SelectItem>
                <SelectItem value="skull">Radiografía de Cráneo</SelectItem>
                <SelectItem value="spine">Radiografía de Columna</SelectItem>
                <SelectItem value="abdomen">Ultrasonido Abdominal</SelectItem>
                <SelectItem value="pelvic">Ultrasonido Pélvico</SelectItem>
                <SelectItem value="head-ct">Tomografía de Cráneo</SelectItem>
                <SelectItem value="abdominal-ct">Tomografía Abdominal</SelectItem>
                <SelectItem value="brain-mri">Resonancia Magnética de Cerebro</SelectItem>
                <SelectItem value="spine-mri">Resonancia Magnética de Columna</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="img-region">Región Anatómica</Label>
            <Input id="img-region" placeholder="Especifique la región anatómica" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="img-notes">Observaciones Clínicas</Label>
            <Textarea id="img-notes" placeholder="Observaciones clínicas relevantes para el estudio" />
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
