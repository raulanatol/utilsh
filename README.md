<div align="center">
    <h1>Utilsh</h1>
</div>

<p>Shell scripts, apps, tools, utils and misc</p>

---

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Manual Install](#manual-install)
- [Update](#update)
- [List of tools](#list-of-tools)
  - [👩‍💻 code](#%E2%80%8D-code)
  - [🐳 docker](#-docker)
  - [📂 fs](#-fs)
  - [🎋 git](#-git)
  - [🐙 Github](#-github)
  - [🍎 mac](#-mac)
  - [🌍 network](#-network)
  - [Self scripts (self)](#self-scripts-self)
  - [Shell scrips and utils (shell)](#shell-scrips-and-utils-shell)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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

### 👩‍💻 code

    * tokei: Tokei is a program that displays statistics about your code using [tokei](https://github.com/XAMPPRocky/tokei)
    * grex: Grex is a command-line tool and library for generating regular expressions [grex](https://github.com/pemistahl/grex)
    * doctoc: Generates table of contents for markdown files inside local git repository [DocToc](https://github.com/thlorenz/doctoc)
    
### 🐳 docker
    * ctop: Top-like interface for container metrics (using [ctop](https://github.com/bcicen/ctop))
    * lazydocker: A simple terminal UI for both docker and docker-compose, written in Go with the gocui library. (using [lazydocker](https://github.com/jesseduffield/lazydocker))

### 📂 fs
    * folder_size: Calculate the current folder size (using du or ncdu)  
 
### 🎋 git
    * commit: Add all files and then a commit
    * fix: Fix the current branch and create a Pull Request (use with start-issue)
    * pretty-diff: Show a pretty git diff using fzf (and copy selected path to the clipboard)
    * pretty-log: Git log filtering
    * start-issue: Create a branch with the format issue_$PARAM1 (useful with fix) 
    * ui: Git terminal ui using [gitui](https://github.com/extrawurst/gitui)

### 🐙 Github
    * 🚀 trigger-action: Launch an action manually
    * 🎃 actions: Open the github actions page of the current project
           
### 🍎 mac
    * 🥶 bluetooth: On/Off bluetooth using [blueutil](http://www.frederikseiffert.de/blueutil/)
    * 🚀 browser_goto: Select between the opened chrome tabs using [choose](https://github.com/chipsenkbeil/choose)
    * 🙈 hidden_files: Show/Hide hidden files
    * 🔇 not_disturb: Enter/Exit not disturb mode
    * 📶 wifi:
        * On/Off Wifi
        * dhcp: Renew DHCP Lease
        * password: Get password of the current wifi 
    
### 🌍 network
    * 📡 ip: Get the local (-l) or public ip
    * 🔌 ports: List of used ports
    * 🐌 speed: Internet connection speed test using [fast-cli](https://github.com/sindresorhus/fast-cli)
    * 🏹 fetch: Http request using [httpie](https://httpie.org/)
    * 🧪 usage: Monitoring the current network utilization by process, connection and remote IP/hostname using [bandwhich](https://github.com/imsnif/bandwhich)
    
### Self scripts (self)

🤳 **update**: Update utilsh repo
         
### Shell scrips and utils (shell)

🔶 **args**: Arguments control

⁉️ **assert**: Assertion methods

👩‍💻 **development**: Scripts related with development

    - **increase_semversion**: Generate the next version based on [Semantic Versioning](https://semver.org/) (major|minor|patch) 

📜 **docs**: script documentation scripts

🎋 **git**: Git scripts, get current branch, etc.

👾 **os**: OS shell utils

🎨 **sout**: Console out functions

💹 **string**: String manipulation scripts
