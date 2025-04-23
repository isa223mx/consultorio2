"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Save, TrendingUp } from "lucide-react"

export default function VitalSigns() {
  const [selectedPatient, setSelectedPatient] = useState("")

  // Datos de ejemplo para la gráfica
  const data = [
    { date: "01/03", weight: 70, temperature: 36.5, systolic: 120, diastolic: 80, pulse: 72 },
    { date: "08/03", weight: 69.5, temperature: 36.7, systolic: 118, diastolic: 78, pulse: 70 },
    { date: "15/03", weight: 69, temperature: 36.6, systolic: 122, diastolic: 82, pulse: 74 },
    { date: "22/03", weight: 68.5, temperature: 36.4, systolic: 119, diastolic: 79, pulse: 71 },
    { date: "29/03", weight: 68, temperature: 36.5, systolic: 117, diastolic: 77, pulse: 69 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Signos Vitales</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Ver Tendencias</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Signos Vitales</CardTitle>
          <CardDescription>Registre los signos vitales del paciente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vs-patient">Paciente</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger id="vs-patient">
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
              <Label htmlFor="vs-date">Fecha</Label>
              <Input id="vs-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-time">Hora</Label>
              <Input id="vs-time" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vs-temperature">Temperatura (°C)</Label>
              <Input id="vs-temperature" type="number" step="0.1" placeholder="36.5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-weight">Peso (kg)</Label>
              <Input id="vs-weight" type="number" step="0.1" placeholder="70.0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-height">Estatura (cm)</Label>
              <Input id="vs-height" type="number" placeholder="170" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-systolic">Presión Arterial Sistólica (mmHg)</Label>
              <Input id="vs-systolic" type="number" placeholder="120" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-diastolic">Presión Arterial Diastólica (mmHg)</Label>
              <Input id="vs-diastolic" type="number" placeholder="80" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-pulse">Frecuencia Cardíaca (lpm)</Label>
              <Input id="vs-pulse" type="number" placeholder="72" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-respiratory">Frecuencia Respiratoria (rpm)</Label>
              <Input id="vs-respiratory" type="number" placeholder="16" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-oxygen">Saturación de Oxígeno (%)</Label>
              <Input id="vs-oxygen" type="number" placeholder="98" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vs-glucose">Glucosa (mg/dL)</Label>
              <Input id="vs-glucose" type="number" placeholder="90" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vs-notes">Observaciones</Label>
            <Input id="vs-notes" placeholder="Observaciones adicionales" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto flex items-center gap-2">
            <Save size={16} />
            <span>Guardar Registro</span>
          </Button>
        </CardFooter>
      </Card>

      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Historial de Signos Vitales</CardTitle>
            <CardDescription>Tendencias de los últimos registros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Sistólica" />
                  <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastólica" />
                  <Line type="monotone" dataKey="pulse" stroke="#ff7300" name="Pulso" />
                  <Line type="monotone" dataKey="temperature" stroke="#ff0000" name="Temperatura" />
                  <Line type="monotone" dataKey="weight" stroke="#0088fe" name="Peso" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
