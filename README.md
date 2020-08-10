# utilsh

Shell scripts, apps, tools, utils and misc.

## Install

```shell script
bash <(curl -s https://raw.githubusercontent.com/raulanatol/utilsh/master/installer)
```

## Manual Install 

- Clone this repository

- Create the tools env variable

```shell script
utilsh_PATH=..../REPOSITORY_BASE_DIR
utilsh_PATH=~/utils/utilsh
```

- Use me!
```shell script
./$UTILSH_PATH/help
```

## Update

```shell script
./$UTILSH_PATH/src/update
```


## List of tools

 * 📂 fs
    * folder_size: Calculate the current folder size (using du or ncdu)  

 * 🐙 Github
    * 🚀 trigger-action: Launch an action manually
           
 * 🍎 mac
    * 🔇 not_disturb: Enter/Exit not disturb mode
    * 📶 wifi:
        * On/Off Wifi
        * dhcp: Renew DHCP Lease
        * password: Get password of the current wifi 
    * 🙈 hidden_files: Show/Hide hidden files
    * 🥶 bluetooth: On/Off bluetooth using [blueutil](http://www.frederikseiffert.de/blueutil/)
    
 * 🌍 network
    * 🐌 speed: Internet connection speed test using [fast-cli](https://github.com/sindresorhus/fast-cli)
    * 🔌 ports: List of used ports
    * 📡 ip: Get the local (-l) or public ip
    
 * 🧰 shell
    * 🎨 sout: Console out functions
    * 👩‍💻 development: Scripts related with development
        * increase_semversion: Generate the next version based on [Semantic Versioning](https://semver.org/) (major|minor|patch) 
    * 🎋 Git
        * git: Git scripts, get current branch, etc.
    * 👾 os
