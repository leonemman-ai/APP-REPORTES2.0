import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { getDocumentos, downloadDocumento } from '../../services/api';
import { Download, FileText, Calendar, Loader2 } from 'lucide-react';

export function ListaDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      const data = await getDocumentos();
      setDocumentos(data);
    } catch (error) {
      console.error('Error fetching documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc) => {
    try {
      setDownloading(doc.id);
      await downloadDocumento(doc.id, doc.filename);
    } catch (error) {
      console.error('Error downloading:', error);
      alert('Error al descargar el documento');
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Documentos Generados</CardTitle>
      </CardHeader>
      <CardContent>
        {documentos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p>No hay documentos generados aún</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="tabla-documentos">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Folio</th>
                  <th className="text-left py-3 px-4 font-semibold">Municipio</th>
                  <th className="text-left py-3 px-4 font-semibold">Afiliación</th>
                  <th className="text-left py-3 px-4 font-semibold">Fecha</th>
                  <th className="text-center py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium">{doc.folio}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{doc.data?.municipio || '-'}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-mono">{doc.data?.afiliacion || '-'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(doc.created_at).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        disabled={downloading === doc.id}
                        data-testid={`btn-download-${doc.folio}`}
                      >
                        {downloading === doc.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Descargando...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
