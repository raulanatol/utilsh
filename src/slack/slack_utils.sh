slack::focus_workspace() {
  local _workspace_name=$1
  osascript -- - "$_workspace_name" <<EOF
  on run argv
    set _workspace_name to (item 1 of argv)
    tell application "Slack" to activate
    tell application "System Events"
      tell process "Slack"
        click (menu item 1 where its name starts with (_workspace_name)) of menu "Workspace" of menu item "Workspace" of menu "File" of menu bar item "File" of menu bar 1
        delay 0.5
      end tell
    end tell
  end run
EOF
}

slack::open_channel() {
  local _channel_name=$1
  osascript -- - "$_channel_name" <<EOF
  on run argv
    set _channel_name to (item 1 of argv)
    tell application "Slack" to activate
    tell application "System Events"
      keystroke "k" using {command down}
			delay 0.5
			keystroke _channel_name
			delay 0.5
			key code 36
			delay 0.5
    end tell
  end run
EOF
}

slack::set_away() {
  slack::execute_command "Set yourself as away" ""
  slack::press_return
}

slack::set_active() {
  slack::execute_command "Set yourself as active" ""
  slack::press_return
}

slack::set_do_not_disturb() {
  local _hours=${1:-1}
  slack::execute_command "dnd ${_hours}h"
  slack::press_return
}

slack::clear_status() {
  slack::execute_command "clear your status" ""
}

slack::execute_command() {
  local _command=$1
  local _msg=$2
  osascript -- - "$_command" "$_msg" <<EOF
  on run argv
    set _command to (item 1 of argv)
    set _msg to (item 2 of argv)
    tell application "Slack" to activate
    tell application "System Events"
      key code 44
      delay 0.5
      keystroke (_command)
      delay 0.5
      key code 36
      if ((_msg) is not equal to "") then
        delay 0.5
        key code 36
        delay 0.5
        keystroke (_msg)
				delay 0.5
				key code 36
			end if
    end tell
  end run
EOF
}

slack::press_return() {
  osascript -- - "$_command" "$_msg" <<EOF
    tell application "Slack" to activate
    tell application "System Events"
      delay 0.5
      key code 36
    end tell
EOF
}
