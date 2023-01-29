root_path=$(pwd)
node_version_current=$(node -v)
node_version_origin=$(node -v)
nodejs_version_16='16.18.1'

function create_nvm() {
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
}

function install_nvm() {
  echo 'install nvm.'
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  create_nvm
  echo 'installed nvm.'
}

function check_nvm_installed() {
  nvm_version==$(nvm --version)
  if [[ $nvm_version =~ ^[0-9] ]]
  then
    echo 'check nvm installed.'
  else
    install_nvm
  fi
}

function install_nodejs_v16() {
  nvm_check=$(nvm ls 16)
  if [[ $nvm_check =~ v16 ]]
  then
    echo 'check node v16 installed.'
  else
    nvm install v$nodejs_version_16
    echo 'install node v16.'
  fi
}

function use_node_16() {
  node_version_current=$(node -v)
  if [[ $node_version_current =~ ^v16 ]]
  then
    echo "node $node_version_current"
  else
    check_nvm_installed
    nvm use v$nodejs_version_16
    node_version_current=$(node -v)
    echo "use node $node_version_current" 
  fi
  echo "Nodejs: $node_version_current"
}

function install_root() {
  use_node_16
  npm ci
}

node_version_origin=$(node -v)
echo "Nodejs: $node_version_origin"
create_nvm
install_nodejs_v16
install_root
cd $root_path
cp ./.vscode/.code-workspace.example ./.vscode/.code-workspace
cp ./apps/main/.env.example ./apps/main/.env
cp ./apps/sub-app/.env.example ./apps/sub-app/.env
echo Finished!