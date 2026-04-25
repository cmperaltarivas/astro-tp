---
sidebar_position: 3
title: Certificado SSL — Apache (Autofirmado)
description: Instalación y configuración de un certificado SSL autofirmado en Apache sobre Ubuntu Server.
sidebar_label: Certificado SSL
---

# 🔐 Certificado SSL Autofirmado en Apache

:::tip
Esta guía te ayudará a instalar un certificado SSL autofirmado en tu servidor Apache en Ubuntu, asegurando que cada paso se realice correctamente y sin errores.
:::

## Guía paso a paso para instalar un certificado SSL

### Prerrequisitos

💻 **Sistema operativo**: Ubuntu (o una distribución similar de Linux).<br />
🌐 **Servidor web**: Apache instalado y funcionando.<br />
🔑 **Privilegios**: Acceso con permisos de superusuario (`sudo`).<br />

### Paso 1: Generar un certificado SSL autofirmado

Ejecuta el siguiente comando para generar una clave privada y un certificado SSL autofirmado válido por 365 días:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/apache-selfsigned.key \
    -out /etc/ssl/certs/apache-selfsigned.crt
```

:::info ¿Qué hace este comando?
🔐 **openssl req -x509 ...**: Genera una clave privada y un certificado autofirmado válido por 365 días.
:::

Durante el proceso, se te solicitará ingresar información. Asegúrate de ingresar `miempresa.local` en el campo **Common Name (CN)**.

:::danger
Debes tener el DNS `miempresa.local` configurado para que el certificado sea válido.
:::

Ejemplo de valores solicitados durante la generación:

```text
Country Name (2 letter code) [AU]: CL
State or Province Name (full name) [Some-State]: Valdivia
Locality Name (eg, city) []: La Unión
Organization Name (eg, company) [Internet Widgits Pty Ltd]: Liceo
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []: miempresa.local
```

### Paso 2: Configurar Apache para usar el certificado SSL

#### 2.1. Editar el archivo de configuración SSL

Abre el archivo `default-ssl.conf`:

```bash
sudo nano /etc/apache2/sites-available/default-ssl.conf
```

#### 2.2. Configurar las rutas del certificado y la clave

Dentro del bloque ``, asegúrate de que las directivas SSLCertificateFile y SSLCertificateKeyFile apunten a los archivos que generaste:

```text
SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
```

#### 2.3. Configurar el nombre del servidor

Añade la directiva ServerName para especificar tu dominio:

```text
ServerName miempresa.local
```

#### 2.4. Ejemplo de bloque `` completo

```apache

    ServerAdmin webmaster@localhost
    ServerName miempresa.local
    DocumentRoot /var/www/html

    SSLEngine on
    SSLCertificateFile      /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile   /etc/ssl/private/apache-selfsigned.key

    
        SSLOptions +StdEnvVars
    

    
        SSLOptions +StdEnvVars
    

    BrowserMatch "MSIE [2-6]" \
        nokeepalive ssl-unclean-shutdown \
        downgrade-1.0 force-response-1.0


```

Guarda los cambios (Ctrl + O) y cierra el editor (Ctrl + X).

## Paso 3: Habilitar el sitio SSL y el módulo SSL en Apache

```bash
sudo a2ensite default-ssl
sudo a2enmod ssl
```

:::info ¿Qué hace este comando?
🌐 **a2ensite default-ssl**: Habilita el sitio SSL por defecto en Apache.<br />
🔒 **a2enmod ssl**: Habilita el módulo SSL en Apache.
:::

## Paso 4: Reiniciar Apache

```bash
sudo systemctl restart apache2
sudo systemctl status apache2
```

## Paso 5: Configurar el archivo de hosts (opcional)

Si `miempresa.local` es un dominio local y no está registrado en DNS, puedes añadir una entrada en `/etc/hosts` o el archivo equivalente en Windows:

🟢 **Servidor DNS preferido:** `192.168.0.107`<br />
🔵 **Servidor DNS alternativo:** `8.8.8.8`<br />

```text
192.168.0.100   miempresa.local
```

## Paso 6: Probar la configuración

Accede a:

```text
https://miempresa.local
```

Es posible que el navegador muestre advertencias por ser un certificado autofirmado.

## Verificaciones útiles

```bash
sudo apachectl configtest
sudo tail -f /var/log/apache2/error.log
sudo chmod 600 /etc/ssl/private/apache-selfsigned.key
sudo chmod 644 /etc/ssl/certs/apache-selfsigned.crt
```

Nota: para ambientes de producción, usa certificados emitidos por una CA reconocida (Let's Encrypt u otra).
