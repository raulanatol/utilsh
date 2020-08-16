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

 * 🐳 docker
    * ctop: Top-like interface for container metrics (using [ctop](https://github.com/bcicen/ctop))
    * lazydocker: A simple terminal UI for both docker and docker-compose, written in Go with the gocui library. (using [lazydocker](https://github.com/jesseduffield/lazydocker))

 * 📂 fs
    * folder_size: Calculate the current folder size (using du or ncdu)  
 
 * 👩‍💻 git
    * commit: Add all files and then a commit
    * fix: Fix the current branch and create a Pull Request (use with start-issue)
    * pretty-diff: Show a pretty git diff using fzf (and copy selected path to the clipboard)
    * pretty-log: Git log filtering
    * start-issue: Create a branch with the format issue_$PARAM1 (useful with fix) 

 * 🐙 Github
    * 🚀 trigger-action: Launch an action manually
    * 🎃 actions: Open the github actions page of the current project
           
 * 🍎 mac
    * 🥶 bluetooth: On/Off bluetooth using [blueutil](http://www.frederikseiffert.de/blueutil/)
    * 🙈 hidden_files: Show/Hide hidden files
    * 🔇 not_disturb: Enter/Exit not disturb mode
    * 📶 wifi:
        * On/Off Wifi
        * dhcp: Renew DHCP Lease
        * password: Get password of the current wifi 
    
 * 🌍 network
    * 📡 ip: Get the local (-l) or public ip
    * 🔌 ports: List of used ports
    * 🐌 speed: Internet connection speed test using [fast-cli](https://github.com/sindresorhus/fast-cli)
    * 🏹 fetch: Http request using [httpie](https://httpie.org/)
    
 * 🤳 self
    * 🤦‍♂️ update: Update utilsh repo
         
 * 🧰 shell
    * 🔶 args: Arguments control
    * ⁉️ assert: Assertion methods
    * 👩‍💻 development: Scripts related with development
        * increase_semversion: Generate the next version based on [Semantic Versioning](https://semver.org/) (major|minor|patch) 
    * 📜 docs: script documentation scripts
    * 🎋 git: Git scripts, get current branch, etc.
    * 👾 os: OS shell utils
    * 🎨 sout: Console out functions
    * 💹 string: String manipulation scripts
