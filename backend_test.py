import requests
import sys
import json
import tempfile
import os
from datetime import datetime
from pathlib import Path

class OrdenesAPITester:
    def __init__(self, base_url="https://productivity-suite-14.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.errors = []

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        headers = {}
        if not files:
            headers['Content-Type'] = 'application/json'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                if files:
                    response = requests.post(url, data=data, files=files)
                else:
                    response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.text:
                    try:
                        response_data = response.json()
                        if isinstance(response_data, dict) and 'message' in response_data:
                            print(f"   Message: {response_data['message']}")
                        elif isinstance(response_data, list):
                            print(f"   Items returned: {len(response_data)}")
                    except:
                        print(f"   Response size: {len(response.content)} bytes")
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                print(f"❌ Failed - {error_msg}")
                try:
                    error_detail = response.json()
                    print(f"   Error detail: {error_detail}")
                except:
                    print(f"   Response text: {response.text}")
                self.errors.append(f"{name}: {error_msg}")

            return success, response.json() if success and response.content else {}

        except Exception as e:
            error_msg = f"Error: {str(e)}"
            print(f"❌ Failed - {error_msg}")
            self.errors.append(f"{name}: {error_msg}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "/", 200)

    def test_get_afiliaciones(self):
        """Test get all affiliations"""
        success, response = self.run_test("Get Afiliaciones", "GET", "/afiliaciones", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} afiliaciones")
            if len(response) > 0:
                print(f"   Sample: {response[0].get('codigo', 'N/A')}")
        return success, response

    def test_search_afiliacion(self):
        """Test search affiliation by code"""
        # First get affiliations to get a valid code
        success, afiliaciones = self.test_get_afiliaciones()
        if success and len(afiliaciones) > 0:
            test_code = afiliaciones[0]['codigo']
            return self.run_test("Search Afiliacion", "GET", f"/afiliaciones/search?q={test_code}", 200)
        else:
            print("⚠️ Skipping search test - no affiliations found")
            return False, {}

    def test_get_trouble_tickets(self):
        """Test get all trouble tickets"""
        success, response = self.run_test("Get Trouble Tickets", "GET", "/tt", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} trouble tickets")
            if len(response) > 0:
                print(f"   Sample folio: {response[0].get('folio', 'N/A')}")
        return success, response

    def test_get_tt_by_folio(self):
        """Test get TT by folio"""
        # First get TTs to get a valid folio
        success, tts = self.test_get_trouble_tickets()
        if success and len(tts) > 0:
            test_folio = tts[0]['folio']
            return self.run_test("Get TT by Folio", "GET", f"/tt/{test_folio}", 200)
        else:
            print("⚠️ Skipping TT by folio test - no TTs found")
            return False, {}

    def test_get_documentos(self):
        """Test get generated documents"""
        success, response = self.run_test("Get Documentos", "GET", "/documentos", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} generated documents")
        return success, response

    def create_test_excel_file(self, filename):
        """Create a simple test Excel file"""
        try:
            import pandas as pd
            
            if "afiliaciones" in filename.lower():
                # Create affiliations test file
                df = pd.DataFrame({
                    'AFILIACIONES': ['TEST001', 'TEST002'],
                    'C5 TOLUCA': ['Toluca', 'Metepec'],
                    'NOMBRE COMERCIAL': ['Test Comercial 1', 'Test Comercial 2'],
                    'DIRECCION': ['Test Address 1', 'Test Address 2']
                })
            else:
                # Create TT test file
                df = pd.DataFrame({
                    'Folio': ['TT001', 'TT002'],
                    'Col1': ['Data1', 'Data2'],
                    'Servicio': ['Internet', 'Television'],
                    'Tecnologia': ['Fibra', 'Coaxial'],
                    'Col4': ['', ''],
                    'Col5': ['', ''],
                    'Col6': ['', ''],
                    'Col7': ['', ''],
                    'Col8': ['', ''],
                    'Afiliacion': ['AF001', 'AF002'],
                    'Descripcion': ['Test description 1', 'Test description 2'],
                    'Col11': ['', ''],
                    'Fecha': ['2024-01-01', '2024-01-02']
                })
            
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx')
            df.to_excel(temp_file.name, index=False)
            return temp_file.name
        
        except ImportError:
            print("⚠️ pandas not available for Excel file creation")
            return None

    def test_upload_afiliaciones(self):
        """Test upload affiliations Excel file"""
        excel_file = self.create_test_excel_file("afiliaciones_test.xlsx")
        if not excel_file:
            print("⚠️ Skipping afiliaciones upload test - cannot create Excel file")
            return False, {}
        
        try:
            with open(excel_file, 'rb') as f:
                files = {'file': ('test_afiliaciones.xlsx', f, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
                success, response = self.run_test("Upload Afiliaciones", "POST", "/afiliaciones/upload", 200, files=files)
            return success, response
        finally:
            if os.path.exists(excel_file):
                os.unlink(excel_file)

    def test_upload_tt(self):
        """Test upload TT Excel file"""
        excel_file = self.create_test_excel_file("tt_test.xlsx")
        if not excel_file:
            print("⚠️ Skipping TT upload test - cannot create Excel file")
            return False, {}
        
        try:
            with open(excel_file, 'rb') as f:
                files = {'file': ('test_tt.xlsx', f, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
                success, response = self.run_test("Upload TT", "POST", "/tt/upload", 200, files=files)
            return success, response
        finally:
            if os.path.exists(excel_file):
                os.unlink(excel_file)

    def test_generar_documento(self):
        """Test document generation"""
        # Get some test data first  
        _, afiliaciones = self.test_get_afiliaciones()
        _, tts = self.test_get_trouble_tickets()
        
        form_data = {
            'folio': tts[0]['folio'] if tts else 'TEST-001',
            'municipio': 'Test Municipality',
            'direccion': 'Test Address',
            'afiliacion': afiliaciones[0]['codigo'] if afiliaciones else 'TEST001',
            'nombre_comercial': 'Test Commercial Name',
            'tecnico': 'Test Technician',
            'supervisor': 'Test Supervisor',
            'solicitante': 'Test Requester',
            'fecha_creacion': '2024-01-01',
            'descripcion_falla': 'Test failure description',
            'diagnostico': 'Test diagnosis',
            'solucion': 'Test solution'
        }
        
        # Use multipart form data format
        try:
            url = f"{self.base_url}/documentos/generar"
            response = requests.post(url, data=form_data)  # Don't set Content-Type for multipart
            
            self.tests_run += 1
            print(f"\n🔍 Testing Generate Document...")
            print(f"   URL: {url}")
            
            if response.status_code == 200:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                print(f"   Document generated successfully, size: {len(response.content)} bytes")
                return True, {}
            else:
                error_msg = f"Expected 200, got {response.status_code}"
                print(f"❌ Failed - {error_msg}")
                try:
                    error_detail = response.json()
                    print(f"   Error detail: {error_detail}")
                except:
                    print(f"   Response text: {response.text}")
                self.errors.append(f"Generate Document: {error_msg}")
                return False, {}
                
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            print(f"❌ Failed - {error_msg}")
            self.errors.append(f"Generate Document: {error_msg}")
            return False, {}

def main():
    print("🧪 Starting Órdenes API Tests...")
    print("=" * 50)
    
    tester = OrdenesAPITester()
    
    # Test basic endpoints
    print("\n📋 Testing Basic Endpoints...")
    tester.test_root_endpoint()
    
    # Test affiliations
    print("\n🏢 Testing Afiliaciones...")
    tester.test_get_afiliaciones()
    tester.test_search_afiliacion()
    
    # Test trouble tickets
    print("\n🎫 Testing Trouble Tickets...")
    tester.test_get_trouble_tickets()
    tester.test_get_tt_by_folio()
    
    # Test documents
    print("\n📄 Testing Documentos...")
    tester.test_get_documentos()
    
    # Test uploads (if pandas available)
    print("\n⬆️ Testing File Uploads...")
    tester.test_upload_afiliaciones()
    tester.test_upload_tt()
    
    # Test document generation
    print("\n📝 Testing Document Generation...")
    tester.test_generar_documento()
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.errors:
        print("\n❌ Errors found:")
        for error in tester.errors:
            print(f"   - {error}")
        return 1
    else:
        print("\n✅ All tests passed!")
        return 0

if __name__ == "__main__":
    sys.exit(main())