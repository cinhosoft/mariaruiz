#!/usr/bin/env python3
import http.server
import socketserver
import os
from pathlib import Path

# Cambiar al directorio del proyecto
os.chdir(Path(__file__).parent)

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor ejecutándose en http://localhost:{PORT}/")
    print("Presiona Ctrl+C para detener el servidor")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
