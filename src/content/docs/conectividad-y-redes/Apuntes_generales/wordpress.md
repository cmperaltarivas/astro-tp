---
sidebar_position: 6
title: Instalación de WordPress en Ubuntu Server
description: Guía paso a paso para instalar WordPress en Ubuntu con Apache y MySQL.
sidebar_label: WordPress
---

# 📦 Instalación de WordPress en Ubuntu Server

Aquí tienes una guía paso a paso para instalar WordPress en un servidor Ubuntu, extraída de las fuentes que has proporcionado:

## Configuración de inicio

### Actualizar servidor `Ubuntu`

```bash
sudo apt update && apt upgrade -y
```

---

## Apache

:::info 📝 Nota
`Apache` es un servidor web que sirve contenido HTTP y HTTPS, permitiendo el alojamiento y entrega de sitios web a los usuarios.
:::

### Instalación en el servidor `Apache`

```bash
sudo apt install apache2 -y
```

### Verificar el estado del servicio `Apache`

```bash
systemctl status apache2
```

## <img src="/img/statusapache.png" alt="Status de Apache" class="imagen-3d" />

:::tip Iniciar Apache:

Si Apache no está corriendo, puedes iniciarlo con:

```bash
sudo systemctl start apache2
```

:::

:::danger Detener Apache:

Si necesitas detener el servicio de Apache (por ejemplo, para realizar mantenimiento):

```bash
sudo systemctl stop apache2
```

:::

:::warning Reiniciar Apache:
Si has realizado cambios en la configuración de Apache o necesitas reiniciar el servicio, utiliza:

```bash
sudo systemctl restart apache2
```

:::

:::info Recargar la Configuración de Apache:
Si has cambiado los archivos de configuración de Apache y deseas que se apliquen los cambios sin interrumpir las conexiones activas, utiliza el siguiente comando para recargar la configuración sin detener el servicio:

```bash
sudo systemctl reload apache2
```

:::

:::note Habilitar Apache para que Inicie Automáticamente al Arrancar:

Para asegurarte de que Apache se inicie automáticamente cada vez que el servidor se reinicia, habilita el servicio:

```bash
sudo systemctl enable apache2
```

:::

### Comprobar si el servicio apache está funcionando en su dirección `IP`

#### Debe introducir la IP del servidor en el navegador web, le debe aparecer la siguiente imagen si todo anda bien.

## <img src="/img/rutaip.png" alt="IP del servidor en el navegador web" class="imagen-3d" />

---

## PHP

:::info 📝 Nota
`PHP` es un lenguaje de programación del lado del servidor diseñado para crear contenido web dinámico y gestionar interacciones con bases de datos.
:::

### Comprobar si PHP está instalado

```bash
php -v
```

### Agregar repositorio para versiones de PHP (ejemplo)

```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
```

### Instalar extensiones comunes para WordPress

```bash
sudo apt install php libapache2-mod-php php-mysql
```

---

## MYSQL

:::note 📝 Nota
`MySQL` es un sistema de gestión de bases de datos relacional que permite almacenar, organizar y acceder a datos de forma rápida y eficiente.
:::

### Ver si está instalado MySQL

```bash
mysql --version
```

:::note 📝 Nota
Si está instalado seguir con [Ingresar a MySQL como usuario root Acceder a MySQL](#acceder-a-mysql)
:::

### Instalación MySQL en el servidor

```bash
sudo apt-get install mysql-server
```

### Configuración de MySQL

### Acceder a MySQL

```bash
sudo su
mysql -u root -p
```

### Crear la base de datos para WordPress

```sql
CREATE DATABASE wordpress;
```

### Crear un nuevo usuario para WordPress

```sql
CREATE USER 'wordpress_user'@'localhost' IDENTIFIED BY '12345678';
```

:::note 📝 Nota
Puedes cambiar el nombre de usuario (`wordpress_user`) y la contraseña (`12345678`) si lo deseas.
:::

### Otorgar privilegios al usuario de WordPress

```sql
GRANT ALL ON wordpress.* TO 'wordpress_user'@'localhost';
```

### Recargar los privilegios

```sql
FLUSH PRIVILEGES;
```

### Salir de MySQL

```sql
exit;
```

:::danger 😱 Nota
Si todo anda mal puedes volver a instalar MySQL, aca tienes los comandos para borrar la base de datos, solo si es necesario.
:::

### Borrar MySQL

```bash title="Detener los servicios MySQL"
sudo systemctl stop mysql
```

```bash title="Eliminar MySQL"
sudo apt remove --purge mysql-server mysql-client mysql-common
```

```bash title="Eliminar archivos residuales"
sudo apt autoremove
sudo apt autoclean
```

```bash title="Elimina configuración"
sudo rm -rf /etc/mysql /var/lib/mysql
sudo rm -rf /var/log/mysql
```

---

## ZIP

:::info 📝 Nota
`Zip` es una herramienta de compresión que permite empaquetar y reducir el tamaño de archivos y directorios para facilitar su almacenamiento o transferencia.
:::

### Instalación programa ZIP

```bash
sudo apt install zip -y
```

---

## WordPress

:::info 📝 Nota
`WordPress` es un sistema de gestión de contenidos (CMS) de código abierto que facilita la creación y administración de sitios web y blogs de manera sencilla y personalizable.
:::

### Descargar WordPress

```bash
cd
sudo wget https://wordpress.org/latest.tar.gz
```

### Descomprimir el archivo descargado

```bash
tar xzf latest.tar.gz
```

### Mover la carpeta de WordPress al directorio web

```bash
sudo mv wordpress/ /var/www/html/
```

### Cambiar los permisos de los archivos

```bash
sudo chown -R www-data /var/www/html
sudo chown -R root:www-data /var/www
sudo chown -R www-data:www-data /var/www/html/wordpress
sudo chmod 777 /var/www
sudo find /var/www/html/wordpress -type d -exec chmod 755 {} \;
sudo find /var/www/html/wordpress -type f -exec chmod 755 {} \;
```

### Acceder a WordPress en el navegador web

```text
http://ip_servidor/wordpress
```

:::warning 😱 Nota
Reemplaza `ip_servidor` con la dirección IP de tu servidor.
:::

### Bienvenida de WordPress

<img src="/img/bienvenidawordpress.png" alt="IP del servidor en el navegador web" class="imagen-3d" />

### Ingreso de datos sobre la base de datos

<img src="/img/datoswordpress.png" alt="Datos de la base de datos" class="imagen-3d" />

### Ejecutar la instalación

<img src="/img/ejecutarwordpress.png" alt="Ejecutar la instalación de WordPress" class="imagen-3d" />

### Agregar información solicitada e instalar WordPress

<img src="/img/instalacionwordpress.png" alt="Agregar información solicitada e instalar WordPress" class="imagen-3d" />

### Instalación exitosa hacer login

<img src="/img/loginwordpress.png" alt="Instalación exitosa hacer login" class="imagen-3d" />

### Hacer inicio sesión con nombre de usuario y contraseña

<img src="/img/iniciosesionwordpress.png" alt="Hacer inicio sesión con nombre de usuario y contraseña" class="imagen-3d" />

### Ingreso satisfactorio

<img src="/img/ingresosatisfactorio.png" alt="Hacer inicio sesión con nombre de usuario y contraseña" class="imagen-3d" />

---

:::tip 😊 ¡Felicidades! Has instalado WordPress.
:::
