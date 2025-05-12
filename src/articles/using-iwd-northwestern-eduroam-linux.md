---
title: Using iwd to Connect to Northwestern Eduroam Wi-Fi
author: Melinda Chang
description:
  Eduroam has a lot of irritating config options that you need to specify manually to get online
  during an Arch Linux installation. Here's some informal documentation of the process.
date: '2025.05.09'
categories:
  - Linux
  - Northwestern
published: true
---

I have attempted by this point to install Arch Linux on campus Wi-Fi twice. Unfortunately, the
`Guest-Northwestern` network is not an option&mdash;the only browser included in the installation
medium is the text-based `lynx`, which fails to get you all the way through authentication for some
reason. The `iwd` network daemon is the recommended way to connect to Internet during installation,
if you're going by the excellent
[Arch Wiki](https://wiki.archlinux.org/title/Installation_guide#Connect_to_the_internet).

That leaves eduroam! This is a Northwestern-specific guide, which I mention because the network
configuration profile for eduroam varies somewhat by school. If (a) you have any way to use your
phone's Wi-Fi tethering or (b) the Ethernet port in your dorm room actually functions, either option
may save you a few hours.

# Getting started

Before you enter the Arch live environment, you need to download the Northwestern eduroam
certificate `nu-eduroam.cer` from
[this website](https://services.northwestern.edu/TDClient/30/Portal/KB/ArticleDet?ID=1113) onto a
device that you can mount and access during installation. This is probably going to be another flash
drive. (If, like me, your Arch ISO is on a drive with the latest Ventoy installed, you can place the
certificate on the same filesystem&mdash;just create a folder with a file named `.ventoyignore`
inside.)

Once in the live environment, run `fdisk -l` and identify the name of the device where the
certificate is stored. Run the following:

```shellscript
mnt <device_name> /path/to/dir
cd /path/to/dir
cp nu-eduroam.cer /var/lib/iwd
```

# Configuration

In the same directory, create the eduroam config file with your text editor of choice.

```shellscript
cd /var/lib/iwd
vim eduroam.8021x
```

The Northwestern config file should be formatted as follows:

```
[Security]
EAP-Method=PEAP
EAP-Identity=anonymous@northwestern.edu
EAP-PEAP-CACert=/var/lib/iwd/nu-eduroam.cer
EAP-PEAP-ServerDomainMask=netauth2.northwestern.edu
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=<NETID>@northwestern.edu
EAP-PEAP-Phase2-Password=<PASSWORD>

[Settings]
AutoConnect=true
```

Naturally, you would replace `<NETID>` with your Northwestern-issued netID and `<PASSWORD>` with
your password. Leave everything else alone.

The contents of this file were extracted from the
[eduroam CAT installer for Linux](https://cat.eduroam.org/), which is really a Python script with
the `iwd` config buried inside somewhere&mdash;it's easy enough to dig through your institution's
installer and see what details you need to populate. If you need to do so, a few things I found
helpful:

- The `IwdConfiguration` class has functions to create configs for a number of different protocols,
  but you can safely assume that only one of them will work. It's likely that your institution's IT
  department has instructions available online for how to log into eduroam on Android. Use whichever
  protocol they specify there.
- If you have a ServerDomainMask option, the input is probably listed as an array where each string
  is preceded by `DNS:`. Ours looks like this:
  ```python
  Config.servers = ['DNS:netauth2.northwestern.edu']
  ```
  Just use the URI that follows and discard the `DNS:`, or it won't work.

# Connect to Wi-Fi

You should be good to go. Run the following:

```shellscript
iwctl station wlan0 connect eduroam
```

Optionally test your connection to see if it's throwing up any errors:

```shellscript
ping archlinux.org
```

And you're in!

# Tips & Troubleshooting

If you used `archinstall` and chose the minimal option, consider copying this config file to the
external device you mounted earlier. This way, you can copy it and the certificate again to
`/var/lib/iwd` when you chroot into your new system. Remember to install `iwd` and a text editor
like `vim` at this stage, because there won't be any way for you to do so once you've restarted your
computer.

Check to make sure you've spelled everything correctly. If your configuration file is using the
wrong protocol, you will see an error that reads something like this:

```
EAP server tried method X while client was configured for method Y
EAP completed with eapFail
4-Way handshake failed for ...
```

The [Arch Wiki](https://wiki.archlinux.org/title/Iwd#eduroam) has a section on using eduroam with
`iwd`. It's not comprehensive, but there are some helpful tips available for you to reference.
