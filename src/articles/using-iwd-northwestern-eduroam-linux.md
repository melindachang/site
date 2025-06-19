---
title: Using iwd to Connect to Northwestern Eduroam Wi-Fi
author: Melinda Chang
description: Some sparse documentation for authenticating with eduroam during an Arch installation.
date: '2025.05.09'
tags:
  - College
  - Linux
published: true
---

I have attempted by this point to install Arch Linux on campus Wi-Fi
twice. Unfortunately, the guest network is not an option, as I haven't
been able to get through web authentication with Lynx (the only
browser included in the installation medium).

That leaves eduroam and iwd. This is a Northwestern-specific guide,
which I mention because the network configuration profile varies
somewhat by school. Consider using either Ethernet or Wi-Fi tethering
to save yourself some inconvenience.

## Getting started

I'll assume here that you have already prepared your installation
medium. Before you enter the Arch live environment, you need to
download the Northwestern eduroam certificate `nu-eduroam.cer` from
[this
website](https://services.northwestern.edu/TDClient/30/Portal/KB/ArticleDet?ID=1113)
onto a device that you can mount and access during installation. This
is probably going to be another flash drive. (For
[Ventoy](https://www.ventoy.net/en/index.html) users: you can place
the certificate on the same filesystem as your ISOs. Create a
directory with a file named `.ventoyignore` inside. [Learn more
here.](https://www.ventoy.net/en/doc_search_path.html))

Once in the live environment, run `fdisk -l` and identify the name of
the device where the certificate is stored. Run the following:

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

Populate this file with all of the necessary information. For
Northwestern, your config should be formatted exactly as follows:

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
  Just use the URI that follows and discard the `DNS:`.

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

If you are attempting to configure eduroam at a different institution,
the [Arch Wiki](https://wiki.archlinux.org/title/Iwd#eduroam) has some
related (albeit non-comprehensive) information available for your
reference.

If you used `archinstall` and chose the minimal option, consider
copying this config file to the external device you mounted earlier
that holds your certificate. This way, you can copy it and the
certificate again to `/var/lib/iwd` when you chroot into your new
system. Remember to install iwd and a text editor like Vim at this
stage, because there won't be any way for you to do so once you
reboot.

To view relevant entries in the system journal, execute the following:

```shellscript
journalctl -u iwd.service
```

If iwd determines that your config file specifies the wrong protocol,
like PEAP-TLS instead of PEAP-MSCHAPV2, you will see an error that
reads something like this:

```
EAP server tried method X while client was configured for method Y
EAP completed with eapFail
4-Way handshake failed for ...
```

I wasn't able to find any documentation online describing which method
code corresponds to which protocol. This message is fairly
inscrutable, also, because I've noticed that it is occasionally thrown
if you've provided an incorrect value for a valid protocol (e.g.,
misspelled password). You should check possibilities exhaustively.

If you prefer to use NetworkManager after your installation is
complete, it employs a wpa_supplicant backend by default. [See how
to switch to
iwd](https://wiki.archlinux.org/title/NetworkManager#Using_iwd_as_the_Wi-Fi_backend)
here so that you can continue to use the configs that you just set up.
