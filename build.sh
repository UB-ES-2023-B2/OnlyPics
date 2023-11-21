docker-compose up -d --build
docker-compose push

# URL de Render
render_url="https://api.render.com/deploy/srv-clbrqjd4lnec73d0ghug?key=ThBEs7v02F8"

# Realizar solicitud HTTP con curl
response=$(curl -X POST -H "Content-Type: application/json" "$render_url")

# Imprimir la respuesta del servidor
echo "Respuesta del servidor: $response"