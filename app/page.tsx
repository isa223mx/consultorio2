'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PatientRecord from "@/components/patient-record"
import MedicalNote from "@/components/medical-note"
import LabRequest from "@/components/lab-request"
import ImagingRequest from "@/components/imaging-request"
import VitalSigns from "@/components/vital-signs"
import Diagnostics from "@/components/diagnostics"
import { ModeToggle } from "@/components/mode-toggle"
import Login from "@/components/ui/login"
import { useAuth } from "@/components/auth-context"; // Importa useAuth


export default function Home() {
 /* const {isAuthenticated} = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Login />
      </div>
    )
  }*/

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Encabezado */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">MEDITEC</h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600">Dr. Sabino</span>
              <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">
                SB
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="patient-record" className="w-full">
          {/* Lista de pestañas */}
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="patient-record">Expediente</TabsTrigger>
            <TabsTrigger value="medical-note">Nota Médica</TabsTrigger>
            <TabsTrigger value="lab-request">Estudios</TabsTrigger>
            <TabsTrigger value="imaging">Imagenología</TabsTrigger>
            <TabsTrigger value="vital-signs">Signos Vitales</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>

          </TabsList>

          {/* Contenido de cada pestaña */}
          <TabsContent value="patient-record" className="space-y-4">
            <PatientRecord />
          </TabsContent>

          <TabsContent value="medical-note" className="space-y-4">
            <MedicalNote />
          </TabsContent>

          <TabsContent value="lab-request" className="space-y-4">
            <LabRequest />
          </TabsContent>

          <TabsContent value="imaging" className="space-y-4">
            <ImagingRequest />
          </TabsContent>

          <TabsContent value="vital-signs" className="space-y-4">
            <VitalSigns />
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-4">
            <Diagnostics />
          </TabsContent>
        </Tabs>
      </main>

      {/* Pie de página */}
      <footer className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© MEDITEC 2025</p>
        </div>
      </footer>
    </div>
  )
}