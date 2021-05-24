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
  - [code](#code)
  - [docker](#docker)
  - [fs](#fs)
  - [git](#git)
  - [Github](#github)
  - [js](#js)
  - [mac](#mac)
  - [network](#network)
  - [Self scripts (self)](#self-scripts-self)
  - [Shell scripts and utils (shell)](#shell-scripts-and-utils-shell)
  - [Slack scripts](#slack-scripts)
- [Completion](#completion)
  - [More info:](#more-info)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```shell script
bash <(curl -s https://raw.githubusercontent.com/raulanatol/utilsh/main/installer)
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

### code

**doctoc:** Generates table of contents for markdown files inside local git
repository [DocToc](https://github.com/thlorenz/doctoc)

**grex:** Grex is a command-line tool and library for generating regular
expressions [grex](https://github.com/pemistahl/grex)

📦&nbsp; **new_finish_release:** Generate the initial finish-release file in your project

😇&nbsp; **new_makefile:** Generate the initial makefile in your project

👩‍💻&nbsp; **tokei:** Tokei is a program that displays statistics about your code
using [tokei](https://github.com/XAMPPRocky/tokei)
    
---

### docker

🔌&nbsp; **connect:** execute a ssh command over a running container

🐳&nbsp; **ctop:** Top-like interface for container metrics (using [ctop](https://github.com/bcicen/ctop))

🐳&nbsp; **lazydocker:** A simple terminal UI for both docker and docker-compose, written in Go with the gocui
library. (using [lazydocker](https://github.com/jesseduffield/lazydocker))

---

### fs

🗃&nbsp; **diskonaut:** Terminal disk space navigator (using diskonaut)

⚖&nbsp; **folder_size:** Calculate the current folder size (using du or ncdu)
 
---

### git

🔖&nbsp; **commit:** Add all files and then a commit

🧹&nbsp; **delete-merged:** Delete all branches that have been merged in remote

🔧&nbsp; **fix:** Fix the current branch and create a Pull Request (use with start-issue)

🕴&nbsp; **jump:** Git Branches Helper using [git-jump](https://github.com/mykolaharmash/git-jump)

💄&nbsp; **pretty-diff:** Show a pretty git diff using fzf (and copy selected path to the clipboard)

🖲&nbsp; **pretty-log:** Git log filtering

🚩&nbsp; **start-issue:** Create a branch with the format issue_$PARAM1 (useful with fix)

🍥&nbsp; **ui:** Git terminal ui using [gitui](https://github.com/extrawurst/gitui)

---

### Github

🎃&nbsp; **actions:** Open the github actions page of the current project

🧲&nbsp; **create_workflow:** Generate a Github Workflow file in your project

🖤&nbsp; **to-main:** Move github default branch from master to main

🚀&nbsp; **trigger-action:** Launch an action manually
  
---

### js

🛁&nbsp; **autarky:** Liberating disk space from node_modules
using [autarky](https://github.com/pranshuchittora/autarky)

---

### mac

🥶&nbsp; **bluetooth:** On/Off bluetooth using [blueutil](http://www.frederikseiffert.de/blueutil/)

🚀&nbsp; **browser_goto:** Select between the opened chrome tabs using [choose](https://github.com/chipsenkbeil/choose)

🙈&nbsp; **hidden_files:** Show/Hide hidden files

🔇&nbsp; **not_disturb:** Enter/Exit not disturb mode

📶&nbsp; **wifi:**

* On/Off Wifi
* dhcp: Renew DHCP Lease
* password: Get password of the current wifi

🥵&nbsp; **powermetrics:** Show the temperature

📟&nbsp; **zoom:**

* start: Start your personal meeting

---    

### network

📡&nbsp; **ip:** Get the local (-l) or public ip

🔌&nbsp; **ports:** List of used ports

🐌&nbsp; **speed:** Internet connection speed test using [fast-cli](https://github.com/sindresorhus/fast-cli)

🏹&nbsp; **fetch:** Http request using [httpie](https://httpie.org/)

🧪️&nbsp; **usage:** Monitoring the current network utilization by process, connection and remote IP/hostname
using [bandwhich](https://github.com/imsnif/bandwhich)

---

### Self scripts (self)

🤳&nbsp; **update**: Update utilsh repo

---

### Shell scripts and utils (shell)

🔶&nbsp; **args**: Arguments control

⁉️&nbsp; **assert**: Assertion methods

👩‍💻&nbsp; **development**: Scripts related with development

🏷&nbsp; **increase_semversion**: Generate the next version based on [Semantic Versioning](https://semver.org/) (
major|minor|patch)

📜&nbsp; **docs**: script documentation scripts

🎋&nbsp; **git**: Git scripts, get current branch, etc.

👾&nbsp; **os**: OS shell utils

📈&nbsp; **performance**: Evaluate the zsh starting time.

🎨&nbsp; **sout**: Console out functions

💹&nbsp; **string**: String manipulation scripts

---

### Slack scripts

✅&nbsp; **active**: Slack active status

👻&nbsp; **away**: Slack away status

🔇&nbsp; **snooze**: Slack snooze actions

---

## Completion

_dot contains the completion script with all the tools

### More info:

- http://zsh.sourceforge.net/Doc/Release/Completion-System.html
- https://mads-hartmann.com/2017/08/06/writing-zsh-completion-scripts.html
- https://github.com/zsh-users/zsh-completions
