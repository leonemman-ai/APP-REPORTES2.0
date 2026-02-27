import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { uploadAfiliaciones, uploadTT } from '../../services/api';

export function ConfiguracionArchivos({ onAfiliacionesUploaded, onTTUploaded }) {
  const [loadingAfiliaciones, setLoadingAfiliaciones] = useState(false);
  const [loadingTT, setLoadingTT] = useState(false);
  const [successAfiliaciones, setSuccessAfiliaciones] = useState(null);
  const [successTT, setSuccessTT] = useState(null);
  const [errorAfiliaciones, setErrorAfiliaciones] = useState(null);
  const [errorTT, setErrorTT] = useState(null);

  const handleUploadAfiliaciones = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingAfiliaciones(true);
    setErrorAfiliaciones(null);
    setSuccessAfiliaciones(null);

    try {
      const response = await uploadAfiliaciones(file);
      setSuccessAfiliaciones(response.message);
      if (onAfiliacionesUploaded) onAfiliacionesUploaded();
      setTimeout(() => setSuccessAfiliaciones(null), 3000);
    } catch (error) {
      setErrorAfiliaciones(error.message || 'Error al subir archivo');
    } finally {
      setLoadingAfiliaciones(false);
      e.target.value = '';
    }
  };

  const handleUploadTT = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingTT(true);
    setErrorTT(null);
    setSuccessTT(null);

    try {
      const response = await uploadTT(file);
      setSuccessTT(response.message);
      if (onTTUploaded) onTTUploaded();
      setTimeout(() => setSuccessTT(null), 3000);
    } catch (error) {
      setErrorTT(error.message || 'Error al subir archivo');
    } finally {
      setLoadingTT(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cargar Archivo de Afiliaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="afiliaciones-file">Archivo Excel (.xlsx)</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="afiliaciones-file"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loadingAfiliaciones ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    'Seleccionar archivo'
                  )}
                </label>
                <Input
                  id="afiliaciones-file"
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={handleUploadAfiliaciones}
                  disabled={loadingAfiliaciones}
                  data-testid="upload-afiliaciones"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Solo archivos .xlsx
              </p>
            </div>
          </div>
          {successAfiliaciones && (
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">{successAfiliaciones}</span>
            </div>
          )}
          {errorAfiliaciones && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-sm text-red-800">{errorAfiliaciones}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cargar Archivo TT Diario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="tt-file">Archivo Excel (.xlsx)</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="tt-file"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loadingTT ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    'Seleccionar archivo'
                  )}
                </label>
                <Input
                  id="tt-file"
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={handleUploadTT}
                  disabled={loadingTT}
                  data-testid="upload-tt"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Solo archivos .xlsx
              </p>
            </div>
          </div>
          {successTT && (
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">{successTT}</span>
            </div>
          )}
          {errorTT && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-sm text-red-800">{errorTT}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
