"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Search, Save } from "lucide-react"

export default function PatientRecord() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Expediente de Pacientes</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <UserPlus size={16} />
            <span>Nuevo Paciente</span>
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar paciente por nombre o ID..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">Nuevo Paciente</TabsTrigger>
          <TabsTrigger value="existing">Paciente Existente</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Historia Clínica</CardTitle>
              <CardDescription>Registre los datos del nuevo paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Nombre completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Fecha de Nacimiento</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Ocupación</Label>
                  <Input id="occupation" placeholder="Ocupación" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="Teléfono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="Correo electrónico" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Textarea id="address" placeholder="Dirección completa" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea id="allergies" placeholder="Alergias conocidas" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical-history">Antecedentes Médicos</Label>
                <Textarea id="medical-history" placeholder="Historial médico relevante" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="family-history">Antecedentes Familiares</Label>
                <Textarea id="family-history" placeholder="Historial médico familiar" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto flex items-center gap-2">
                <Save size={16} />
                <span>Guardar Historia Clínica</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="existing">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Registrados</CardTitle>
              <CardDescription>Seleccione un paciente para ver su expediente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <div className="grid grid-cols-5 font-medium">
                    <div>ID</div>
                    <div className="col-span-2">Nombre</div>
                    <div>Edad</div>
                    <div>Última Visita</div>
                  </div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="grid grid-cols-5">
                        <div>P-{1000 + i}</div>
                        <div className="col-span-2">Paciente Ejemplo {i}</div>
                        <div>{20 + i * 10}</div>
                        <div>10/03/2025</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
