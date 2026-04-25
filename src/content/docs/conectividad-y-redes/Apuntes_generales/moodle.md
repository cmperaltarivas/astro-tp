---
sidebar_position: 5
title: Instalación de Moodle en Ubuntu Server
description: Pasos para instalar y configurar Moodle en un servidor Ubuntu (Apache, PHP, MySQL).
sidebar_label: Moodle
---

# 🎓 Instalación de Moodle en Ubuntu Server

Guía paso a paso para instalar Moodle en Ubuntu Server.

## 1. Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Instalar Apache

:::info
Los comandos siguientes requieren permisos de administrador (sudo).
:::

```bash
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2
```

## 3. Instalar PHP

:::info 📝 Nota
`PHP` es un lenguaje de programación del lado del servidor diseñado para crear contenido web dinámico y gestionar interacciones con bases de datos.
:::

### Comprobar si PHP está instalado

```bash
php -v
```

### Agregar repositorio e instalar extensiones para Moodle

```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install php8.1 php8.1-mysql php8.1-xml php8.1-intl php8.1-mbstring -y
```

### Ajustar variables de PHP

```bash
# Edita /etc/php/8.1/apache2/php.ini y ajusta:
# max_input_vars = 5000
```

### Reiniciar Apache para aplicar cambios de PHP

```bash
sudo systemctl restart apache2
```

## 4. Instalar MySQL

```bash
sudo apt-get install mysql-server -y
```

### Acceder a MySQL como root

```bash
sudo mysql -u root -p
```

### Crear base de datos y usuario para Moodle

```sql
CREATE DATABASE moodle;
CREATE USER 'moodle_user'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL ON moodle.* TO 'moodle_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 5. Descargar e instalar Moodle

```bash
sudo wget -c https://download.moodle.org/download.php/direct/stable404/moodle-latest-404.zip
sudo unzip moodle-latest-404.zip
sudo mv moodle /var/www/html/moodle
sudo mkdir -p /var/www/moodledata
sudo chown -R www-data:www-data /var/www/html/moodle
sudo chown -R www-data:www-data /var/www/moodledata
```

## 6. Acceso al instalador web

```text
http://IP_DEL_SERVIDOR/moodle
```

:::tip
¡Felicidades! Has instalado Moodle.
:::

## 7. Comandos útiles de Apache

### Reiniciar Apache

```bash
sudo systemctl restart apache2
```

### Recargar configuración (sin interrumpir conexiones)

```bash
sudo systemctl reload apache2
```

### Habilitar Apache al arrancar

```bash
sudo systemctl enable apache2
```

## 🔧 Solución de problemas

### Cómo desinstalar MySQL si algo salió mal

```bash title="Detener los servicios MySQL"
sudo systemctl stop mysql
```

```bash title="Eliminar MySQL"
sudo apt remove --purge mysql-server mysql-client mysql-common -y
```

```bash title="Eliminar archivos residuales"
sudo apt autoremove -y
sudo apt autoclean
```

```bash title="Eliminar configuración de MySQL"
sudo rm -rf /etc/mysql /var/lib/mysql
sudo rm -rf /var/log/mysql
```
