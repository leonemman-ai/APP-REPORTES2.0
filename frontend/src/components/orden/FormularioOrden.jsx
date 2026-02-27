import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAfiliaciones } from '../../hooks/useAfiliaciones';
import { useTroubleTickets } from '../../hooks/useTroubleTickets';
import { generarDocumento, searchAfiliacion, getTTByFolio } from '../../services/api';
import { FileText, Upload, Loader2, CheckCircle } from 'lucide-react';

export function FormularioOrden() {
  const { afiliaciones } = useAfiliaciones();
  const { troubleTickets } = useTroubleTickets();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    folio: '',
    municipio: '',
    direccion: '',
    afiliacion: '',
    nombre_comercial: '',
    solicitante: '',
    fecha_creacion: '',
    atendido_por: '',
    tecnologia: '',
    servicio: '',
    fecha_llegada: '',
    cliente_info: '',
    descripcion_falla: '',
    afiliacion2: '',
    falla_declarada: '',
    diagnostico_real: '',
    estatus_folio: '',
    fecha_atencion: '',
    diagnostico: '',
    acciones: '',
    estatus_reparacion: '',
    voltaje: '',
    razon1: '',
    razon2: '',
    cliente2: '',
    descripcion2: '',
    folio2: '',
    diagnostico_detallado: '',
    solucion: '',
    componentes_instalados: '',
    componentes_retirados: '',
    tecnico: '',
    supervisor: ''
  });

  const [imagenes, setImagenes] = useState({
    antes: null,
    proceso1: null,
    proceso2: null,
    final: null
  });

  const [imagesPreviews, setImagesPreviews] = useState({
    antes: null,
    proceso1: null,
    proceso2: null,
    final: null
  });

  // Autocompletar cuando se selecciona un folio
  useEffect(() => {
    const autoFillFromTT = () => {
      if (formData.folio && troubleTickets && troubleTickets.length > 0) {
        const tt = troubleTickets.find(t => t.folio === formData.folio);
        if (tt) {
          // LLENAR TODOS LOS CAMPOS CON DATOS DEL TT
          setFormData(prev => ({
            ...prev,
            servicio: tt.servicio || '',
            tecnologia: tt.tecnologia || '',
            descripcion_falla: tt.descripcion || '',
            falla_declarada: tt.descripcion || '',
            fecha_creacion: tt.fecha || '',
            afiliacion: tt.afiliacion || '',
            afiliacion2: tt.afiliacion || '',
            // LLENAR TODOS LOS CAMPOS DE FOLIO AUTOMÁTICAMENTE
            folio2: tt.folio || '',
            cliente_info: tt.afiliacion || '',
            cliente2: tt.afiliacion || ''
          }));
          
          // Si hay afiliación, buscar datos de municipio, dirección, nombre comercial
          if (tt.afiliacion) {
            handleAfiliacionChange(tt.afiliacion);
          }
        }
      }
    };
    
    autoFillFromTT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.folio]);

  // Autocompletar cuando se selecciona una afiliación
  const handleAfiliacionChange = (codigo) => {
    if (!codigo) return;
    
    setFormData(prev => ({ ...prev, afiliacion: codigo, afiliacion2: codigo }));
    
    if (afiliaciones && afiliaciones.length > 0) {
      const afiliacion = afiliaciones.find(a => a.codigo === codigo);
      if (afiliacion) {
        setFormData(prev => ({
          ...prev,
          afiliacion: codigo,
          afiliacion2: codigo,
          municipio: afiliacion.municipio || '',
          direccion: afiliacion.direccion || '',
          nombre_comercial: afiliacion.nombre_comercial || ''
        }));
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (field, file) => {
    if (file) {
      setImagenes(prev => ({ ...prev, [field]: file }));
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.folio) {
      alert('Por favor seleccione un folio');
      return;
    }
    
    if (!formData.tecnico || !formData.supervisor) {
      alert('Por favor complete los campos de Técnico y Supervisor');
      return;
    }
    
    setLoading(true);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key] || '');
      });

      // Agregar imágenes
      Object.keys(imagenes).forEach(key => {
        if (imagenes[key]) {
          formDataToSend.append(key, imagenes[key]);
        }
      });

      const response = await generarDocumento(formDataToSend);
      
      // Descargar el archivo
      if (response && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${formData.folio || 'documento'}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
      
    } catch (error) {
      console.error('Error generando documento:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Error desconocido';
      alert(`Error al generar el documento: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Datos Generales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Datos Generales</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="folio">No. Folio *</Label>
            <Select value={formData.folio} onValueChange={(value) => handleInputChange('folio', value)}>
              <SelectTrigger data-testid="select-folio">
                <SelectValue placeholder="Seleccione Folio" />
              </SelectTrigger>
              <SelectContent>
                {troubleTickets.map((tt) => (
                  <SelectItem key={tt.folio} value={tt.folio}>
                    {tt.folio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="afiliacion">Afiliación *</Label>
            <Select 
              value={formData.afiliacion} 
              onValueChange={handleAfiliacionChange}
            >
              <SelectTrigger data-testid="select-afiliacion">
                <SelectValue placeholder="Seleccione o busque afiliación" />
              </SelectTrigger>
              <SelectContent>
                {afiliaciones.map((af) => (
                  <SelectItem key={af.codigo} value={af.codigo}>
                    {af.codigo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="municipio">Municipio</Label>
            <Input
              id="municipio"
              value={formData.municipio}
              onChange={(e) => handleInputChange('municipio', e.target.value)}
              data-testid="input-municipio"
            />
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              data-testid="input-direccion"
            />
          </div>

          <div>
            <Label htmlFor="nombre_comercial">Nombre Comercial</Label>
            <Input
              id="nombre_comercial"
              value={formData.nombre_comercial}
              onChange={(e) => handleInputChange('nombre_comercial', e.target.value)}
              data-testid="input-nombre-comercial"
            />
          </div>

          <div>
            <Label htmlFor="solicitante">Solicitante</Label>
            <Input
              id="solicitante"
              value={formData.solicitante}
              onChange={(e) => handleInputChange('solicitante', e.target.value)}
              data-testid="input-solicitante"
            />
          </div>

          <div>
            <Label htmlFor="fecha_creacion">Fecha Creación</Label>
            <Input
              id="fecha_creacion"
              type="date"
              value={formData.fecha_creacion}
              onChange={(e) => handleInputChange('fecha_creacion', e.target.value)}
              data-testid="input-fecha-creacion"
            />
          </div>
        </CardContent>
      </Card>

      {/* Descripción de la Falla */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Descripción de la Falla / Incidente</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="atendido_por">Se atendió por</Label>
            <Input
              id="atendido_por"
              value={formData.atendido_por}
              onChange={(e) => handleInputChange('atendido_por', e.target.value)}
              data-testid="input-atendido-por"
            />
          </div>

          <div>
            <Label htmlFor="tecnologia">Tecnología</Label>
            <Input
              id="tecnologia"
              value={formData.tecnologia}
              onChange={(e) => handleInputChange('tecnologia', e.target.value)}
              readOnly={!!formData.folio}
              className={formData.folio ? 'bg-gray-100' : ''}
              data-testid="input-tecnologia"
            />
          </div>

          <div>
            <Label htmlFor="servicio">Servicio</Label>
            <Input
              id="servicio"
              value={formData.servicio}
              onChange={(e) => handleInputChange('servicio', e.target.value)}
              readOnly={!!formData.folio}
              className={formData.folio ? 'bg-gray-100' : ''}
              data-testid="input-servicio"
            />
          </div>

          <div>
            <Label htmlFor="fecha_llegada">Fecha/Hora de llegada</Label>
            <Input
              id="fecha_llegada"
              type="datetime-local"
              value={formData.fecha_llegada}
              onChange={(e) => handleInputChange('fecha_llegada', e.target.value)}
              data-testid="input-fecha-llegada"
            />
          </div>

          <div>
            <Label htmlFor="cliente_info">Cliente</Label>
            <Input
              id="cliente_info"
              value={formData.cliente_info}
              onChange={(e) => handleInputChange('cliente_info', e.target.value)}
              data-testid="input-cliente-info"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="descripcion_falla">Descripción de la falla</Label>
            <Textarea
              id="descripcion_falla"
              value={formData.descripcion_falla}
              onChange={(e) => handleInputChange('descripcion_falla', e.target.value)}
              readOnly={!!formData.folio}
              className={formData.folio ? 'bg-gray-100' : ''}
              data-testid="textarea-descripcion-falla"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="falla_declarada">Falla declarada</Label>
            <Textarea
              id="falla_declarada"
              value={formData.falla_declarada}
              onChange={(e) => handleInputChange('falla_declarada', e.target.value)}
              readOnly={!!formData.folio}
              className={formData.folio ? 'bg-gray-100' : ''}
              data-testid="textarea-falla-declarada"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="diagnostico_real">Falla efectiva / Diagnóstico real</Label>
            <Textarea
              id="diagnostico_real"
              value={formData.diagnostico_real}
              onChange={(e) => handleInputChange('diagnostico_real', e.target.value)}
              data-testid="textarea-diagnostico-real"
            />
          </div>

          <div>
            <Label htmlFor="estatus_folio">Estatus del folio</Label>
            <Input
              id="estatus_folio"
              value={formData.estatus_folio}
              onChange={(e) => handleInputChange('estatus_folio', e.target.value)}
              data-testid="input-estatus-folio"
            />
          </div>

          <div>
            <Label htmlFor="fecha_atencion">Fecha de atención</Label>
            <Input
              id="fecha_atencion"
              type="date"
              value={formData.fecha_atencion}
              onChange={(e) => handleInputChange('fecha_atencion', e.target.value)}
              data-testid="input-fecha-atencion"
            />
          </div>
        </CardContent>
      </Card>

      {/* Comentarios de Atención */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Comentarios de Atención</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="diagnostico">Diagnóstico del problema</Label>
            <Textarea
              id="diagnostico"
              value={formData.diagnostico}
              onChange={(e) => handleInputChange('diagnostico', e.target.value)}
              data-testid="textarea-diagnostico"
            />
          </div>

          <div>
            <Label htmlFor="acciones">Acciones / Trabajos realizados</Label>
            <Textarea
              id="acciones"
              value={formData.acciones}
              onChange={(e) => handleInputChange('acciones', e.target.value)}
              data-testid="textarea-acciones"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estatus_reparacion">Estatus de la reparación</Label>
              <Input
                id="estatus_reparacion"
                value={formData.estatus_reparacion}
                onChange={(e) => handleInputChange('estatus_reparacion', e.target.value)}
                data-testid="input-estatus-reparacion"
              />
            </div>

            <div>
              <Label htmlFor="voltaje">Voltaje inadecuado</Label>
              <Input
                id="voltaje"
                value={formData.voltaje}
                onChange={(e) => handleInputChange('voltaje', e.target.value)}
                data-testid="input-voltaje"
              />
            </div>

            <div>
              <Label htmlFor="razon1">Razón intervención 1</Label>
              <Input
                id="razon1"
                value={formData.razon1}
                onChange={(e) => handleInputChange('razon1', e.target.value)}
                data-testid="input-razon1"
              />
            </div>

            <div>
              <Label htmlFor="razon2">Razón intervención 2</Label>
              <Input
                id="razon2"
                value={formData.razon2}
                onChange={(e) => handleInputChange('razon2', e.target.value)}
                data-testid="input-razon2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="diagnostico_detallado">Diagnóstico detallado</Label>
            <Textarea
              id="diagnostico_detallado"
              value={formData.diagnostico_detallado}
              onChange={(e) => handleInputChange('diagnostico_detallado', e.target.value)}
              data-testid="textarea-diagnostico-detallado"
            />
          </div>

          <div>
            <Label htmlFor="solucion">Solución del problema</Label>
            <Textarea
              id="solucion"
              value={formData.solucion}
              onChange={(e) => handleInputChange('solucion', e.target.value)}
              data-testid="textarea-solucion"
            />
          </div>
        </CardContent>
      </Card>

      {/* Componentes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Componentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="componentes_instalados">Componentes instalados</Label>
            <Textarea
              id="componentes_instalados"
              value={formData.componentes_instalados}
              onChange={(e) => handleInputChange('componentes_instalados', e.target.value)}
              data-testid="textarea-componentes-instalados"
            />
          </div>

          <div>
            <Label htmlFor="componentes_retirados">Componentes retirados</Label>
            <Textarea
              id="componentes_retirados"
              value={formData.componentes_retirados}
              onChange={(e) => handleInputChange('componentes_retirados', e.target.value)}
              data-testid="textarea-componentes-retirados"
            />
          </div>
        </CardContent>
      </Card>

      {/* Evidencia Fotográfica */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Evidencia Fotográfica</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['antes', 'proceso1', 'proceso2', 'final'].map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="capitalize">
                {key === 'proceso1' ? 'Proceso 1' : key === 'proceso2' ? 'Proceso 2' : key}
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {imagesPreviews[key] ? (
                  <div className="relative">
                    <img 
                      src={imagesPreviews[key]} 
                      alt={key} 
                      className="w-full h-48 object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagenes(prev => ({ ...prev, [key]: null }));
                        setImagesPreviews(prev => ({ ...prev, [key]: null }));
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label htmlFor={key} className="cursor-pointer text-blue-600 hover:text-blue-700">
                        Subir imagen
                      </label>
                      <Input
                        id={key}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(key, e.target.files[0])}
                        data-testid={`upload-${key}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Firmas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Firmas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tecnico">Nombre del técnico *</Label>
            <Input
              id="tecnico"
              value={formData.tecnico}
              onChange={(e) => handleInputChange('tecnico', e.target.value)}
              required
              data-testid="input-tecnico"
            />
          </div>

          <div>
            <Label htmlFor="supervisor">Supervisor *</Label>
            <Input
              id="supervisor"
              value={formData.supervisor}
              onChange={(e) => handleInputChange('supervisor', e.target.value)}
              required
              data-testid="input-supervisor"
            />
          </div>
        </CardContent>
      </Card>

      {/* Botón de envío */}
      <div className="flex justify-end space-x-4">
        {success && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Documento generado exitosamente</span>
          </div>
        )}
        <Button 
          type="submit" 
          size="lg" 
          disabled={loading}
          data-testid="btn-generar-documento"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generar Documento
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
