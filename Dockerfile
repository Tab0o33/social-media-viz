# Utilisation d'une image Node.js
FROM node:latest AS build

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie de tous les autres fichiers dans le répertoire de travail
COPY . .

# Construction de l'application Angular
RUN npm run build

# Utilisation d'une image nginx
FROM nginx:alpine

# Copie des fichiers construits de l'application Angular dans le répertoire des fichiers statiques de nginx
COPY --from=build /app/dist/social-media-viz/browser /usr/share/nginx/html

# Exposition du port 4200
EXPOSE 4200

# Commande pour démarrer nginx
# CMD ["nginx", "-g", "daemon off;"]