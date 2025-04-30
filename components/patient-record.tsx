"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Save } from "lucide-react"

export default function PatientRecord() {
  const [step, setStep] = useState(1)
  

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    occupation: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    allergies: "",
    medicalHistory: "",
    familyHistory: "",
    medications: "",
    bloodType: "",
    height: "",
    weight: "",
    bmi:"",
    habits: "",
    observations: ""
  });

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("localhost:3000/historiales/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("¡Historia clínica guardada con éxito!");
      } else {
        alert("Error al guardar. ¡La JUSTICIA debe prevalecer!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("¡Error inesperado!");
    }
  };

  return (
    
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <CardTitle>Historia Clínica</CardTitle>
            <CardDescription>Registre los datos del nuevo paciente</CardDescription>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"} text-white`}
              >
                1
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
              ></div>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"} text-white`}
              >
                2
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
              ></div>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700"} text-white`}
              >
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-blue-600 dark:text-blue-400 font-medium">Datos Personales</span>
              <span
                className={
                  step >= 2 ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-500 dark:text-gray-400"
                }
              >
                Antecedentes
              </span>
              <span
                className={
                  step >= 3 ? "text-blue-600 dark:text-blue-400 font-medium" : "text-gray-500 dark:text-gray-400"
                }
              >
                Información Médica
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Fecha de Nacimiento</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
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

                <Input
                  id="occupation"
                  placeholder="Ocupación"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>

                <Input
                  id="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>

              <Textarea
                  id="address"
                  placeholder="Dirección completa"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Contacto de Emergencia</Label>

              <Input
                  id="emergencyContact"
                  placeholder="Nombre y teléfono"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />

            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="allergies">Alergias</Label>

              <Textarea
                  id="allergies"
                  placeholder="Alergias conocidas"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />

            </div>

            <div className="space-y-2">
              <Label htmlFor="medical-history">Antecedentes Médicos</Label>

              <Textarea
                  id="medicalHistory"
                  placeholder="Alergias conocidas"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-history">Antecedentes Familiares</Label>

              <Textarea
                  id="familyHistory"
                  placeholder="Historial médico familiar"
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Medicamentos Actuales</Label>

              <Textarea
                  id="medications"
                  placeholder="Medicamentos que toma actualmente"
                  value={formData.medications}
                  onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="blood-type">Grupo Sanguíneo</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                <SelectTrigger id="blood-type">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a+">A+</SelectItem>
                  <SelectItem value="a-">A-</SelectItem>
                  <SelectItem value="b+">B+</SelectItem>
                  <SelectItem value="b-">B-</SelectItem>
                  <SelectItem value="ab+">AB+</SelectItem>
                  <SelectItem value="ab-">AB-</SelectItem>
                  <SelectItem value="o+">O+</SelectItem>
                  <SelectItem value="o-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Estatura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />


              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                
                <Input
                  id="weight"
                  type="number"
                  placeholder="70.0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">IMC</Label>
              

                <Input
                  id="bmi"
                  type="number"
                  step={0.01}
                  placeholder="70.0"
                  value={formData.bmi}
                  onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
              />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="habits">Hábitos</Label>
              
              <Textarea
                  id="habits"
                  placeholder="Tabaquismo, alcoholismo, ejercicio, etc."
                  value={formData.habits}
                  onChange={(e) => setFormData({ ...formData, habits: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observaciones Adicionales</Label>
         
              <Textarea
                  id="observations"
                  placeholder="Cualquier otra información relevante"
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              />

            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            Anterior
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <Button onClick={nextStep}>Siguiente</Button>
        ) : (
          <Button className="flex items-center gap-2" onClick={handleSubmit}>
            <Save size={16} />
            <span>Guardar Historia Clínica</span>
          </Button>
        )}

        

      </CardFooter>

      
    </Card>

    
  )



}


