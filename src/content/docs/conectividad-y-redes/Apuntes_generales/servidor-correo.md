---
sidebar_position: 3
title: "Servidor de Correo — Instalación y Configuración"
description: "Guía unificada para instalar y configurar un servidor de correo en Ubuntu Server, siguiendo el formato de la guía de DNS."
keywords: [correo, mail, "ubuntu server", configuración, postfix, dovecot]
sidebar_label: "Servidor de Correo (Postfix/Dovecot)"
---


# 📧 Servidor de Correo con Postfix y Dovecot

Esta guía explica cómo instalar y configurar un servidor de correo en Ubuntu Server utilizando Postfix y Dovecot, siguiendo el formato y estructura de la guía de DNS.

## Introducción

Un servidor de correo permite enviar y recibir emails dentro de una red local o hacia/desde Internet. En esta guía se utilizarán Postfix (MTA) y Dovecot (IMAP/POP3) para una solución básica y funcional.

## Requisitos Previos

💻 **Sistema Operativo**: Ubuntu Server 22.04 LTS o superior<br />
🌐 **Red**: IP estática y DNS configurado<br />
📧 **Dominio**: Un dominio propio o subdominio configurado en DNS<br />

:::info[Planificación previa]
Antes de comenzar, asegúrate de tener:
- Un dominio o subdominio configurado en tu servidor DNS
- El puerto 25 (SMTP), 143 (IMAP) y 110 (POP3) abiertos en el firewall
- Un registro MX apuntando a tu servidor de correo
:::

## Preparación del Sistema

:::warning[Importante]
Realiza estos pasos con privilegios de administrador y asegúrate de tener acceso físico o remoto seguro al servidor.
:::

### 1. Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Configurar el Hostname y DNS

Asegúrate de que el hostname y la resolución DNS coincidan con el nombre de tu servidor de correo (ejemplo: mail.miempresa.local).

```bash
sudo hostnamectl set-hostname mail.miempresa.local
```

Verifica con:

```bash
hostname
hostnamectl
```

## Instalación de Postfix y Dovecot

Instala los paquetes necesarios:

```bash
sudo apt install postfix dovecot-core dovecot-imapd dovecot-pop3d mailutils
```

Durante la instalación de Postfix, selecciona "Internet Site" y escribe el nombre de dominio principal.

:::info[¿Qué es cada paquete?]
- **postfix**: Agente de transferencia de correo (MTA)
- **dovecot-core**: Servidor IMAP/POP3
- **dovecot-imapd**: Soporte para IMAP
- **dovecot-pop3d**: Soporte para POP3
- **mailutils**: Herramientas para enviar correos desde la terminal
:::

## Configuración Básica de Postfix

Edita `/etc/postfix/main.cf` para ajustar los parámetros principales:

```conf
myhostname = mail.miempresa.local
mydomain = miempresa.local
myorigin = /etc/mailname
inet_interfaces = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
relayhost =
mynetworks = 127.0.0.0/8 192.168.0.0/24
home_mailbox = Maildir/
smtpd_banner = $myhostname ESMTP
```

Reinicia Postfix:

```bash
sudo systemctl restart postfix
```

## Configuración Básica de Dovecot

Edita `/etc/dovecot/dovecot.conf` y asegúrate de tener:

```conf
mail_location = maildir:~/Maildir
```

Habilita IMAP y POP3 en `/etc/dovecot/conf.d/10-master.conf`:

```conf
service imap-login {
  inet_listener imap {
    port = 143
  }
}
service pop3-login {
  inet_listener pop3 {
    port = 110
  }
}
```

Reinicia Dovecot:

```bash
sudo systemctl restart dovecot
```

## Verificación y Puesta en Marcha

Verifica el estado de los servicios:

```bash
sudo systemctl status postfix
sudo systemctl status dovecot
```

Envía un correo de prueba:

```bash
echo "Correo de prueba" | mail -s "Prueba" usuario@miempresa.local
```

## Pruebas y Diagnóstico

- Verifica la recepción del correo con un cliente IMAP/POP3 (Thunderbird, Outlook, etc.)
- Usa `telnet` o `openssl s_client` para probar la conexión a los puertos 25, 143 y 110
- Revisa los logs en `/var/log/mail.log` y `/var/log/mail.err`

## Configuración de Clientes

Configura tu cliente de correo con:

- **Servidor de correo entrante (IMAP):** mail.miempresa.local, puerto 143
- **Servidor de correo saliente (SMTP):** mail.miempresa.local, puerto 25
- **Usuario:** tu usuario del sistema
- **Contraseña:** la de tu usuario

## Seguridad y Buenas Prácticas

:::info[Recomendaciones de seguridad]
- Usa contraseñas fuertes para los usuarios
- Limita el acceso a los puertos solo a tu red local si es posible
- Habilita TLS/SSL para cifrar el tráfico de correo (no cubierto en esta guía básica)
- Realiza copias de seguridad regulares de la configuración y buzones
- Mantén el sistema y los paquetes actualizados
- Monitorea los logs para detectar actividad sospechosa
:::

---

:::info[📌 Próximos pasos recomendados]
Para un servidor de correo en producción considera:
- Habilitar **TLS/SSL** para cifrar el tráfico (puertos 587, 993, 995)
- Configurar **autenticación SASL** para evitar relay abierto
- Instalar un **cliente webmail** como Roundcube
- Añadir registros **SPF, DKIM y DMARC** en tu DNS
:::
