"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Search, Plus, Clipboard } from "lucide-react"

export default function Diagnostics() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Datos de ejemplo para diagnósticos comunes
  const commonDiagnoses = [
    { code: "J06.9", name: "Infección respiratoria aguda, no especificada" },
    { code: "A09", name: "Diarrea y gastroenteritis de presunto origen infeccioso" },
    { code: "M54.5", name: "Lumbago no especificado" },
    { code: "J02.9", name: "Faringitis aguda, no especificada" },
    { code: "I10", name: "Hipertensión esencial (primaria)" },
    { code: "E11", name: "Diabetes mellitus tipo 2" },
    { code: "J45.9", name: "Asma, no especificada" },
    { code: "N39.0", name: "Infección de vías urinarias, sitio no especificado" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-bold">Diagnósticos</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Clipboard size={16} />
            <span>Historial</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="diag-patient">Paciente</Label>
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger id="diag-patient">
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
          <Label htmlFor="diag-date">Fecha</Label>
          <Input id="diag-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="diag-type">Tipo de Diagnóstico</Label>
          <Select defaultValue="presumptive">
            <SelectTrigger id="diag-type">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="presumptive">Presuntivo</SelectItem>
              <SelectItem value="definitive">Definitivo</SelectItem>
              <SelectItem value="differential">Diferencial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search size={16} />
            <span>Buscar Diagnóstico</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Plus size={16} />
            <span>Diagnóstico Manual</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Diagnóstico CIE-10</CardTitle>
              <CardDescription>Busque diagnósticos por código o descripción</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar por código o descripción..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Diagnósticos Comunes</h3>
                <div className="border rounded-md">
                  <div className="p-3 border-b bg-gray-50">
                    <div className="grid grid-cols-5 font-medium">
                      <div>Código</div>
                      <div className="col-span-3">Descripción</div>
                      <div className="text-right">Acción</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {commonDiagnoses.map((diagnosis) => (
                      <div key={diagnosis.code} className="p-3 hover:bg-gray-50">
                        <div className="grid grid-cols-5 items-center">
                          <div className="font-mono">{diagnosis.code}</div>
                          <div className="col-span-3">{diagnosis.name}</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              Seleccionar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Diagnóstico Manual</CardTitle>
              <CardDescription>Ingrese manualmente el diagnóstico del paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diag-code">Código CIE-10 (opcional)</Label>
                  <Input id="diag-code" placeholder="Ej. J06.9" />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="diag-name">Diagnóstico</Label>
                  <Input id="diag-name" placeholder="Descripción del diagnóstico" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diag-description">Descripción Detallada</Label>
                <Textarea
                  id="diag-description"
                  placeholder="Descripción detallada del diagnóstico"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diag-plan">Plan de Tratamiento</Label>
                <Textarea id="diag-plan" placeholder="Plan de tratamiento recomendado" className="min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diag-notes">Notas Adicionales</Label>
                <Textarea id="diag-notes" placeholder="Notas adicionales sobre el diagnóstico" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto flex items-center gap-2">
                <Save size={16} />
                <span>Guardar Diagnóstico</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
