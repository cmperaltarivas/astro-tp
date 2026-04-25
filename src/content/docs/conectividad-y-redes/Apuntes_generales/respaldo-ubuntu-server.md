---
sidebar_position: 4
title: Respaldar Ubuntu Server (Duplicity + NFS)
description: Comandos y pasos para realizar respaldos en servidores Ubuntu usando Duplicity y NFS.
sidebar_label: Respaldos (Duplicity)
---

# 💾 Respaldo de Ubuntu Server con Duplicity y NFS

Esta guía explica cómo realizar respaldos completos e incrementales en Ubuntu Server usando **Duplicity** hacia un directorio compartido por **NFS**.

### Montar la carpeta NFS

#### Primero, debes asegurarte de que el directorio NFS esté montado en tu sistema local. Si no lo está, puedes montarlo con:

```bash
sudo mount -t nfs 192.168.0.100:/nfs/Bakup /mnt/nfs_respaldo
```

:::info IP del servidor

La ip 192.168.0.100 es la ip del servidor donde está montado el directorio `NFS`, si se tiene otra ip del servidor, debes cambiarla.

:::

:::tip Respaldos con Duplicity

Duplicity permite hacer respaldos completos e incrementales en archivos comprimidos de manera sencilla. Aquí te dejo los comandos para configurar un respaldo completo e incremental hacia tu servidor `NFS`.

:::

### **Respaldo completo inicial**

#### Este comando realizará un respaldo completo de la carpeta raíz `/` y lo enviará comprimido al destino montado en `/mnt/nfs_respaldo`.

```bash
sudo duplicity / file:///mnt/nfs_respaldo/Backup --exclude=/proc --exclude=/sys --exclude=/tmp --exclude=/dev --exclude=/run --exclude=/mnt/nfs_respaldo --allow-source-mismatch
```

### **Respaldo incremental**

#### Después del respaldo completo inicial, puedes hacer respaldos incrementales que solo incluyan los archivos modificados desde el último respaldo. Para esto, puedes usar:

```bash
sudo duplicity incremental / file:///mnt/nfs_respaldo/Backup --exclude=/proc --exclude=/sys --exclude=/tmp --exclude=/dev --exclude=/run --exclude=/mnt/nfs_respaldo --allow-source-mismatch
```

### Comandos adicionales

#### **Listar los respaldos realizados**:

Para verificar los respaldos que has realizado, puedes ejecutar el siguiente comando para listar las versiones:

```bash
duplicity collection-status file:///mnt/nfs_respaldo/Backup
```

#### **Restaurar el respaldo**:

Si necesitas restaurar el respaldo desde el servidor `NFS` a cualquier ubicación, puedes usar:

```bash
duplicity restore file:///mnt/nfs_respaldo/Backup /ruta/donde/quieres/restaurar
```

### Automatización (Opcional)

#### Puedes configurar una tarea cron para automatizar los respaldos incrementales periódicamente. Para editar el cron, ejecuta:

```bash
sudo crontab -e
```

#### Agrega una línea como la siguiente para hacer un respaldo incremental diario a las 2 AM:

```bash
0 2 * * * duplicity incremental / file:///mnt/nfs_respaldo/Backup --exclude=/proc --exclude=/sys --exclude=/tmp --exclude=/dev --exclude=/run --exclude=/mnt/nfs_respaldo --allow-source-mismatch
```
