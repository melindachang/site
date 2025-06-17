---
title: Using iwd to Connect to Northwestern Eduroam Wi-Fi
author: Melinda Chang
description: Eduroam has a lot of irritatingly opaque config options that you need to specify to get online during an Arch Linux installation. This documentation is for the Northwestern network, but it might still be useful if you're trying to replicate these methods elsewhere.
date: '2025.05.09'
tags:
  - Linux
  - Northwestern
published: true
---

I have attempted by this point to install Arch Linux on campus Wi-Fi twice. Unfortunately, the guest network is not an option&mdash;the only browser included in the installation medium is Lynx, which is text-based and doesn't quite manage to get me through authentication. The [iwd](https://archive.kernel.org/oldwiki/iwd.wiki.kernel.org/) network daemon is the recommended way to connect to Internet during installation, if you're going by the excellent [Arch Wiki](https://wiki.archlinux.org/title/Installation_guide#Connect_to_the_internet).

That leaves eduroam! This is a Northwestern-specific guide, which I mention because the network configuration profile for eduroam varies somewhat by school. If (a) you have any way to use your phone's Wi-Fi tethering or (b) the Ethernet port in your dorm room actually functions, either option may save you some time.

## Getting started

I'll assume here that you have already prepared your installation medium. Before you enter the Arch live environment, you need to download the Northwestern eduroam certificate `nu-eduroam.cer` from [this website](https://services.northwestern.edu/TDClient/30/Portal/KB/ArticleDet?ID=1113) onto a device that you can mount and access during installation. This is probably going to be another flash drive. (If, like me, your Arch ISO is on a drive with the latest Ventoy installed, you can place the certificate on the same filesystem&mdash;just create a folder with a file named `.ventoyignore` inside. [Learn more here.](https://www.ventoy.net/en/doc_search_path.html))

Once in the live environment, run `fdisk -l` and identify the name of the device where the certificate is stored. Run the following:

```shellscript
mnt <device_name> /path/to/dir
cd /path/to/dir
cp nu-eduroam.cer /var/lib/iwd
```

## Configuration

In the same directory, create the eduroam config file.

```shellscript
cd /var/lib/iwd
vim eduroam.8021x
```

Populate this file with all of the necessary information. For Northwestern, your config should be formatted exactly as follows:

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

Naturally, you would replace `<NETID>` with your Northwestern-issued
netID and `<PASSWORD>` with your password. Leave everything else
alone.

The contents of this file were extracted from the [eduroam CAT
installer for Linux](https://cat.eduroam.org/), which is really a
Python script with the iwd config buried inside somewhere&mdash;it's
easy enough to dig through your institution's installer and see which
details to populate. If you find yourself needing to do so, a few
things I found helpful:

- The `IwdConfiguration` class has functions to create configs for a
  number of different protocols, but you can safely assume that only
  one of them will work. It's likely that your institution's IT
  department has instructions available online for how to log into
  eduroam on Android. Use whichever protocol they specify there.
- If you have a ServerDomainMask option, the input is probably listed
  as an array where each string is preceded by `DNS:`. Ours looks like
  this:
  
  ```python
  Config.servers = ['DNS:netauth2.northwestern.edu']
  ```
  
  Just use the URI that follows and discard the `DNS:`, or it won't
  work.

## Connect to Wi-Fi

You should be good to go. Run the following:

```shellscript
iwctl station wlan0 connect eduroam
```

Optionally test your connection to see if it's throwing up any errors:

```shellscript
ping archlinux.org
```

And you're in!

## Tips and troubleshooting

If you used `archinstall` and chose the minimal option, consider
copying this config file to the external device you mounted
earlier. This way, you can copy it and the certificate again to
`/var/lib/iwd` when you chroot into your new system. Remember to
install iwd and a text editor like Vim at this stage, because there
won't be any way for you to do so once you reboot.

To view relevant entries in the system journal, execute the following:

```shellscript
journalctl -u iwd.service
```

If your configuration file specifies the wrong protocol, like PEAP-TLS
instead of PEAP-MSCHAPV2, you will see an error that reads something
like this:

```
EAP server tried method X while client was configured for method Y
EAP completed with eapFail
4-Way handshake failed for ...
```

I wasn't able to find any documentation online describing which method
code corresponds to which protocol. This message is fairly
inscrutable, also, because I've noticed that it is occasionally thrown
if you've provided an incorrect value for a valid protocol (e.g.,
misspelled password).

The [Arch Wiki](https://wiki.archlinux.org/title/Iwd#eduroam) has a
section on using eduroam with iwd. It's not comprehensive, but there
are some helpful tips available for you to reference.

If you prefer to use NetworkManager, it employs a `wpa_supplicant`
backend by default. [See how to switch to
iwd](https://wiki.archlinux.org/title/NetworkManager#Using_iwd_as_the_Wi-Fi_backend)
here so that you can continue to use the configs that you just set up.
