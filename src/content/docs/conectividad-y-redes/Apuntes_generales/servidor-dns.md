---
sidebar_position: 2
title: "Servidor DNS — Instalación y Configuración"
description: "Guía unificada para instalar y configurar un servidor DNS con BIND en Ubuntu Server (unión de guías existentes)."
keywords: [dns, bind, "ubuntu server", configuración]
sidebar_label: "Servidor DNS (BIND)"
---


# 🧑‍💻 Servidor DNS con BIND9 en Ubuntu Server

Esta guía unifica ejemplos y pasos prácticos para instalar y configurar BIND en Ubuntu Server, crear zonas, probar la resolución y configurar clientes.

## Introducción

Un servidor DNS (Domain Name System) es fundamental para resolver nombres de dominio a direcciones IP en una red local. En esta guía veremos instalación, configuración de opciones, creación de zonas (directa e inversa), verificación y buenas prácticas.

## Requisitos Previos

💻 **Sistema Operativo**: Ubuntu Server 22.04 LTS o superior<br />
🧠 **RAM**: Mínimo 1GB (2GB recomendado)<br />
💾 **Almacenamiento**: 20GB mínimo<br />
🌐 **Red**: Interfaz de red configurada con IP estática<br />

:::info[Planificación previa]
Antes de comenzar, asegúrate de tener planificado:<br />
🗺️ El rango de IPs de tu red local<br />
🌐 Los nombres de dominio que vas a gestionar<br />
🖥️ La estructura de tu red y los equipos que incluirás<br />
:::

## Preparación del Sistema

:::warning[Importante]
Realiza todos estos pasos con privilegios de administrador y asegúrate de tener acceso físico o remoto seguro al servidor antes de cambiar la configuración de red.
:::

:::info[Consejo para estudiantes]
Durante esta guía editarás varios archivos de configuración. Siempre haz una copia de seguridad antes de modificar archivos importantes:
```bash
sudo cp /etc/bind/named.conf.options /etc/bind/named.conf.options.bak
```
Para editar, usa `nano`: navega con las flechas, guarda con `Ctrl + O` y sal con `Ctrl + X`.
:::

### 1. Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

Antes de instalar cualquier software, es fundamental asegurarse de que el sistema esté actualizado. Esto previene problemas de dependencias y vulnerabilidades.

:::info[¿Qué hace este comando?]
🔄 <strong>sudo apt update</strong>: Actualiza la lista de paquetes disponibles desde los repositorios configurados.<br />
⬆️ <strong>sudo apt upgrade -y</strong>: Instala las actualizaciones disponibles para todos los paquetes instalados. El parámetro <code>-y</code> acepta automáticamente las confirmaciones.<br />
:::

**Salida esperada:**
Verás una lista de paquetes que se actualizarán y un resumen al final indicando que el sistema está actualizado.

### 2. Configurar IP Estática

:::info[¿Por qué la IP debe ser única?]
Cada servidor DNS debe tener una dirección IP única en la red local. Si dos equipos usan la misma IP, habrá conflictos y la red no funcionará correctamente. Elige una IP que no esté siendo usada por otro dispositivo.
:::

#### a) Verifica la IP actual de tu PC

:::info[Comandos en Windows]
Para saber la IP de tu equipo en **Windows**:

```cmd
ipconfig
```

Esto mostrará todas las interfaces de red y sus direcciones IP. Busca la sección correspondiente a tu adaptador de red (por ejemplo, "Ethernet adapter Ethernet") y anota la línea que dice `IPv4 Address`.

**Limpia la caché DNS y prueba la resolución en Windows:**

```cmd
ipconfig /flushdns
```

```cmd
nslookup servidor1.miempresa.local
```

`ipconfig /flushdns` limpia la caché DNS local, y `nslookup` permite probar la resolución de nombres.
:::

:::info[Comandos en Ubuntu Server]
Para saber la IP de tu equipo en **Ubuntu Server**:

```bash
ip a
```

Busca la interfaz conectada (por ejemplo, `enp0s3` o `eth0`). Anota la IP que aparece en `inet`, por ejemplo `192.168.0.100/24`.
:::

#### b) Elige una IP única

➡️Si tu red es 192.168.0.0/24, puedes usar una IP como 192.168.0.50, 192.168.0.100, 192.168.0.150, etc.

➡️**No uses una IP que ya esté asignada a otro equipo.** Puedes ver los dispositivos conectados en la configuración de tu router o preguntando al profesor.

Para editar la configuración de red en Ubuntu Server, usa:

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

Esto abrirá el editor de texto `nano` para modificar el archivo de configuración de red. Cambia la IP y los DNS según lo planificado.

```yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: false
      addresses:
        - 192.168.0.107/24 # Cambia esta IP por la ip designada.
      gateway4: 192.168.0.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

:::tip[Evita conflictos de IP]
Pregunta a tu profesor o revisa en el router qué IPs están libres antes de elegir la tuya. Así evitarás que dos PCs tengan la misma dirección.
:::

#### d) Aplica la configuración y reinicia la interfaz de red (Ubuntu Server)

1️⃣ Elige una IP que nadie más esté usando.<br />
2️⃣ Configúrala en netplan.<br />
3️⃣ <strong>Aplica la configuración y reinicia la interfaz de red para que los cambios tengan efecto.</strong><br />
4️⃣ Revisa con <code>ip a</code> que quedó bien.<br />

Para aplicar la configuración de red y reiniciar la interfaz en **Ubuntu Server**:

```bash
sudo netplan apply
```

Si tu interfaz de red no toma la IP nueva, puedes reiniciarla manualmente (reemplaza `enp0s3` por el nombre de tu interfaz):

```bash
sudo ip link set enp0s3 down
```

```bash
sudo ip link set enp0s3 up
```

Esto baja y sube la interfaz de red, forzando la recarga de la configuración.

### 3. Configurar el Hostname (Ubuntu Server)

```bash
sudo hostnamectl set-hostname dns-server
```

Para establecer el nombre del equipo (hostname), ejecuta:

```bash
sudo hostnamectl set-hostname dns-server
```

Esto cambiará el nombre del host a `dns-server`. Es útil para identificar el servidor en la red.

:::tip[Verificación del hostname]
Verifica que el hostname se aplicó correctamente con:
```bash
hostname
````
```bash
hostnamectl
````

Ambos comandos muestran el nombre actual del host. `hostnamectl` da información más detallada.
:::

## Instalación de BIND9

:::info[Paquetes instalados]
📦 <strong>bind9</strong>: El servidor DNS principal<br />
🛠️ <strong>bind9utils</strong>: Herramientas de utilidad para BIND<br />
📚 <strong>bind9-doc</strong>: Documentación completa de BIND<br />
🔍 <strong>dnsutils</strong>: Herramientas de diagnóstico (dig, nslookup, etc.)<br />
:::

### Instala todos los paquetes necesarios con el siguiente comando:

```bash
sudo apt install bind9 bind9utils bind9-doc dnsutils
```

:::info[¿Qué hace este comando?]
📦 <strong>apt install bind9 ...</strong>: Instala el servidor BIND9 y utilidades recomendadas para administración y diagnóstico DNS.<br />
🔒 Requiere privilegios de superusuario (<code>sudo</code>).<br />
:::

## Configuración Básica

### Archivo Principal

El archivo principal suele incluir:

```conf
include "/etc/bind/named.conf.options";
include "/etc/bind/named.conf.local";
include "/etc/bind/named.conf.default-zones";
```

### Opciones Globales (`named.conf.options`)

Ejemplo de opciones importantes:

```conf
options {
  directory "/var/cache/bind";
  allow-query { localhost; 192.168.0.0/24; };
  recursion yes;
  allow-transfer { none; };
  listen-on-v6 { any; };
  version "DNS Server";
  dnssec-validation auto;
};
```

## Verificación y Puesta en Marcha

### Prueba de resolución en el sistema

🔎 Verifica que la configuración se aplicó correctamente:

```bash
systemd-resolve --status
```

```bash
nslookup servidor1.miempresa.local
```

`systemd-resolve --status` muestra la configuración de resolución de nombres del sistema. `nslookup` prueba la resolución de un nombre específico.

En Windows, estos comandos limpian la caché DNS y prueban la resolución:

```cmd
ipconfig /flushdns
nslookup servidor1.miempresa.local
```

Para que todos los dispositivos de la red usen automáticamente tu servidor DNS, configura en tu router:
🥇 <strong>DNS primario:</strong> 192.168.0.100 (tu servidor DNS)<br />
🥈 <strong>DNS secundario:</strong> 8.8.8.8 (respaldo)<br />
🔄 Esto hará que todos los dispositivos que obtengan IP por DHCP usen automáticamente tu DNS.<br />

## Configuración de Zonas

```bash
sudo mkdir -p /etc/bind/zones
```

Para crear una carpeta donde guardarás los archivos de zona DNS:

```bash
sudo mkdir -p /etc/bind/zones
```

El parámetro `-p` crea la carpeta y sus directorios padres si no existen.

1️⃣ **Rotación de logs**: Configura logrotate para los archivos de log de BIND<br />
2️⃣ **Monitoreo de rendimiento**: Usa herramientas como `rndc stats` para supervisar el rendimiento<br />
3️⃣ **Actualizaciones de seguridad**: Mantén BIND actualizado con `sudo apt update && sudo apt upgrade`<br />
4️⃣ **Respaldos**: Respalda regularmente `/etc/bind/` y documenta tu configuración<br />

:::tip[Organización de archivos]
Aunque no es obligatorio, crear una carpeta separada para las zonas ayuda a mantener la configuración organizada, especialmente cuando gestionas múltiples dominios.
:::

### Configurar Zonas (`named.conf.local`)

Editar `named.conf.local` y declarar las zonas:

```conf
# Zona directa: define la resolución de nombres a IPs
zone "miempresa.local" {
  type master;                  # Este servidor es el principal para la zona
  file "/etc/bind/db.miempresa.local";  # Ruta al archivo de zona directa
  allow-update { none; };       # No se permiten actualizaciones dinámicas
};

# Zona inversa: define la resolución de IPs a nombres
zone "0.168.192.in-addr.arpa" {
  type master;                  # Este servidor es el principal para la zona inversa
  file "/etc/bind/db.192.168.0";       # Ruta al archivo de zona inversa
  allow-update { none; };       # No se permiten actualizaciones dinámicas
};

<!--
Zona directa: Resuelve nombres a IPs (ej: servidor1.miempresa.local → 192.168.0.100)
Zona inversa: Resuelve IPs a nombres (ej: 192.168.0.100 → servidor1.miempresa.local)
La zona inversa es opcional pero muy recomendada para diagnósticos
-->
```

:::info[Tipos de zona]
➡️ **Zona directa**: Resuelve nombres a IPs (ej: servidor1.miempresa.local → 192.168.0.100)<br />
⬅️ **Zona inversa**: Resuelve IPs a nombres (ej: 192.168.0.100 → servidor1.miempresa.local)<br />
🧪 La zona inversa es opcional pero muy recomendada para diagnósticos<br />
:::

### Archivo de Zona Directa

> **Nota:** En los archivos de zona BIND, los comentarios se escriben usando punto y coma `;` (no `#`).

Ejemplo de archivo de zona directa (`/etc/bind/db.miempresa.local`):

```dns
$TTL 604800                       ; Tiempo de vida por defecto para los registros (en segundos)
@   IN SOA miempresa.local. admin.miempresa.local. (
  1         ; Serial: Incrementa este número en cada cambio
  604800    ; Refresh: Intervalo para que los secundarios consulten cambios
  86400     ; Retry: Tiempo de reintento si falla la consulta
  2419200   ; Expire: Tiempo máximo antes de considerar la zona inválida
  604800 )  ; Negative Cache TTL: Tiempo de cacheo para respuestas negativas

; Servidor de nombres principal
@   IN NS servidor1.miempresa.local.

; Registros A (asocian nombres a direcciones IP)
@          IN A 192.168.0.100
servidor1  IN A 192.168.0.100
mail       IN A 192.168.0.100
www        IN A 192.168.0.100

; Registro MX (correo)
@   IN MX 10 mail.miempresa.local.
```

### Archivo de Zona Inversa

Ejemplo de archivo de zona inversa (`/etc/bind/db.192.168.0`):

```dns
$TTL 604800                       ; Tiempo de vida por defecto para los registros (en segundos)
@   IN SOA dns-server.miempresa.local. admin.miempresa.local. (
  2023110701 ; Serial: Incrementa este número en cada cambio
  604800     ; Refresh: Intervalo para que los secundarios consulten cambios
  86400      ; Retry: Tiempo de reintento si falla la consulta
  2419200    ; Expire: Tiempo máximo antes de considerar la zona inválida
  604800 )   ; Negative Cache TTL: Tiempo de cacheo para respuestas negativas

; Servidor de nombres principal
@   IN NS dns-server.miempresa.local.

; Registros PTR (resolución inversa: IP a nombre)
107 IN PTR dns-server.miempresa.local.
110 IN PTR servidor1.miempresa.local.
111 IN PTR servidor2.miempresa.local.
120 IN PTR workstation1.miempresa.local.
121 IN PTR workstation2.miempresa.local.
130 IN PTR impresora1.miempresa.local.
```

## Verificación y Puesta en Marcha

### Verificar Sintaxis

Antes de reiniciar el servicio DNS, verifica la sintaxis de los archivos de configuración:

### Verifica la sintaxis global de la configuración de BIND

```bash
sudo named-checkconf
```

### Verifica la sintaxis de los archivos de zona directa e inversa

```bash
sudo named-checkzone miempresa.local /etc/bind/db.miempresa.local
```

```bash
sudo named-checkzone 0.168.192.in-addr.arpa /etc/bind/db.192.168.0
```

:::info[¿Qué hace cada comando?]
📝 <strong>named-checkconf</strong>: Verifica la sintaxis global de la configuración de BIND.<br />
🔍 <strong>named-checkzone</strong>: Verifica la sintaxis de los archivos de zona directa e inversa.<br />
Si hay errores, los mostrará en pantalla. Si todo está correcto, verás mensajes como <code>OK</code>.<br />
:::

**Salida esperada:**
Si todo está correcto, verás mensajes como `OK`.

:::warning[Verificación obligatoria]
**NUNCA** reinicies BIND sin verificar primero la sintaxis. Un error en la configuración puede dejar tu servidor DNS inoperativo.
:::

### Reiniciar BIND

Para aplicar los cambios y reiniciar el servicio DNS:

```bash
sudo systemctl restart bind9
```

```bash
sudo systemctl status bind9
```

🔄 <strong>restart</strong>: reinicia el servicio.<br />
✅ <strong>status</strong>: muestra si el servicio está activo y sin errores.<br />

:::tip[Recarga vs Reinicio]
Para cambios menores en las zonas, puedes usar `sudo systemctl reload bind9` en lugar de restart. Esto evita interrupciones en el servicio.
:::

## Pruebas y Diagnóstico

Comandos útiles para verificar el funcionamiento:

### Verificar que el servicio esté escuchando en el puerto 53

```bash
sudo netstat -tulpn | grep :53
```

Para verificar que BIND está escuchando en el puerto 53 (DNS):

```bash
sudo netstat -tulpn | findstr :53
```

En Linux, puedes usar `grep`, pero en Windows usa `findstr`.

### Probar resolución directa

```bash
nslookup servidor1.miempresa.local 192.168.0.100
```

Prueba la resolución directa de nombres:

```bash
nslookup servidor1.miempresa.local 192.168.0.100
```

Esto consulta el nombre `servidor1.miempresa.local` usando el servidor DNS especificado.

### Probar con dig

```bash
dig @192.168.0.100 servidor1.miempresa.local
```

Consulta el registro A de un nombre usando `dig`:

```bash
dig @192.168.0.100 servidor1.miempresa.local
```

### Revisar logs

```bash
sudo tail -f /var/log/syslog | grep named
```

Para ver los logs en tiempo real y filtrar solo los mensajes de BIND:

```bash
sudo tail -f /var/log/syslog | grep named
```

:::tip[Comandos de diagnóstico adicionales]
Otros comandos útiles para diagnóstico:
```bash
dig @192.168.0.100 miempresa.local MX
sudo rndc stats
```
:::

#### Probar resolución inversa

```bash
dig @192.168.0.100 -x 192.168.0.100
```

Prueba la resolución inversa (de IP a nombre):

```bash
dig @192.168.0.100 -x 192.168.0.100
```

#### Verificar registros MX

```bash
dig @192.168.0.100 miempresa.local MX
```

Consulta los registros MX del dominio:

```bash
dig @192.168.0.100 miempresa.local MX
```

#### Ver estadísticas del servidor

```bash
sudo rndc stats
```

Muestra estadísticas del servidor DNS:

```bash
sudo rndc stats
```

## Configuración de Clientes

### Linux (systemd-resolved)

Editar `/etc/systemd/resolved.conf`:

```ini
[Resolve]
DNS=192.168.0.100 8.8.8.8
Domains=miempresa.local
FallbackDNS=8.8.4.4 1.1.1.1
```

Edita el archivo `/etc/systemd/resolved.conf` para configurar los DNS en Linux:

```ini
[Resolve]
DNS=192.168.0.100 8.8.8.8
Domains=miempresa.local
FallbackDNS=8.8.4.4 1.1.1.1
```

Reiniciar el servicio:

```bash
sudo systemctl restart systemd-resolved
```

Reinicia el servicio de resolución de nombres para aplicar los cambios:

```bash
sudo systemctl restart systemd-resolved
```

:::tip[Verificación en clientes Linux]
Verifica que la configuración se aplicó correctamente:
```bash
systemd-resolve --status
```

Verifica que el cliente Linux está usando el DNS correctamente:

```bash
nslookup servidor1.miempresa.local
```

:::

### Windows

1️⃣ Abrir <strong>Panel de Control</strong> → <strong>Centro de redes y recursos compartidos</strong><br />
2️⃣ Hacer clic en <strong>Cambiar configuración del adaptador</strong><br />
3️⃣ Hacer clic derecho en la conexión de red y seleccionar <strong>Propiedades</strong><br />
4️⃣ Seleccionar <strong>Protocolo de Internet versión 4 (TCP/IPv4)</strong> y hacer clic en <strong>Propiedades</strong><br />
5️⃣ Seleccionar <strong>Usar las siguientes direcciones de servidor DNS:</strong><br />
  🥇 <strong>Servidor DNS preferido:</strong> <code>192.168.0.100</code><br />
  🥈 <strong>Servidor DNS alternativo:</strong> <code>8.8.8.8</code><br />
6️⃣ Hacer clic en <strong>Aceptar</strong> para aplicar los cambios<br />

:::tip[Verificación en Windows]
Prueba la configuración desde CMD:
```cmd
ipconfig /flushdns
nslookup servidor1.miempresa.local
```

En Windows, limpia la caché y prueba la resolución:

```cmd
ipconfig /flushdns
nslookup servidor1.miempresa.local
```

:::

## Mantenimiento y Monitoreo

### Seguridad y Buenas Prácticas

:::info[Recomendaciones de configuración y seguridad]
🔎 <strong>allow-query</strong>: Limita quién puede hacer consultas DNS (solo tu red local si es posible).<br />
🖥️ <strong>allow-recursion</strong>: Controla quién puede usar recursión (solo tu red local).<br />
🚃 <strong>allow-transfer</strong>: Previene transferencias de zona no autorizadas.<br />
🔒 Limita las consultas recursivas solo a tu red local.<br />
🆙 Mantén el software actualizado para evitar vulnerabilidades de seguridad.<br />
💾 Realiza copias de seguridad regulares de los archivos de configuración y documenta tu configuración.<br />
🧑‍💻 Monitorea los logs regularmente para detectar problemas.<br />
🛡️ Considera implementar DNS secundario para alta disponibilidad.<br />
🔢 Mantén actualizado el número de serie en los archivos de zona cuando hagas cambios.<br />
1️⃣ <strong>Rotación de logs:</strong> Configura logrotate para los archivos de log de BIND.<br />
2️⃣ <strong>Monitoreo de rendimiento:</strong> Usa herramientas como <code>rndc stats</code> para supervisar el rendimiento.<br />
3️⃣ <strong>Actualizaciones de seguridad:</strong> Mantén BIND actualizado con <code>sudo apt update && sudo apt upgrade</code>.<br />
4️⃣ <strong>Respaldos:</strong> Respalda regularmente <code>/etc/bind/</code>.<br />
:::

## Solución de Problemas Comunes

:::warning[El servicio no inicia después de cambios]
🔎 Verifica la sintaxis con `named-checkconf` y `named-checkzone`.
:::

:::warning[La resolución no funciona desde clientes]
🛡️ Verifica que el puerto 53 esté abierto con `sudo ufw allow 53`.
:::

:::warning[Solo funciona la resolución local, no externa]
🌐 Revisa la configuración de `forwarders` y la conectividad a internet.
:::

:::warning[La resolución inversa no funciona]
🔄 Verifica que la zona inversa esté correctamente definida y los registros PTR sean correctos.
:::
