#!/bin/bash

NODE_VERSION_PREFERED="12.16.0"
NVM_VERSION_NEEDED="0.35.2"

AUTOMOUNT_ID="1VJEZHZCAuDtZzsXYcF9zMoyNBune3pDS"
PACKAGE_JSON_ID="1_PwT9oAJm7g1DkQXpXoDIfBHQMSiIagu"
INSTALLER_ID="1v-dI7GAiPveMRG11wOcXBhMGz0cs0Zei"
INDEX_ID="1z-mADYywMi0Kg-zMuKBKnHHdMf3zjEij"

DOWNLOAD_URL='https://drive.google.com/uc?export=download&id='

function get_command() {
    local COMMAND
    local FOUND_COMMAND
    local EXIT_ON_NOT_FOUND=${2:-"false"}

    COMMAND="$(which "$1" 2>/dev/null)"
    FOUND_COMMAND=$?

    (( $FOUND_COMMAND > 0 )) && {
        COMMAND="$(command -v "$1")"
        FOUND_COMMAND=$?
    }

    (( $FOUND_COMMAND > 0 )) && {
        [ "$EXIT_ON_NOT_FOUND" = "true" ] && {
            echo "Command [$1] not found: aborting"
            exit 1
        } || {
            return $FOUND_COMMAND
        }
    } || {

        printf "%s" "$COMMAND"   

        return $FOUND_COMMAND

    }
}

mkdir -p "$HOME"/.config/balsa/logs
mkdir -p "$HOME"/.config/balsa/balsa

INSTALLER_FOUND="false"
INSTALL_SUCCESS="false"

[ -d /etc/apt ] && DEBIAN="true"
which zypper >/dev/null 2>&1 && OPENSUSE="true"

echo -e "\e[44m\e[1mBienvenue dans le programme d'installation de Balsa!  Initialisation...\e[0m"
#echo -e "\e[34mA privileged user password will be needed.\e[0m"
#echo -e "\e[34mStarting installation in 3 seconds...\e[0m"
#sleep 3

echo -e "\e[93mVeuillez entrer votre mot de passe d'usager sudo\e[0m"
sudo wget -qO /usr/local/bin/automount_googledrive "$DOWNLOAD_URL$AUTOMOUNT_ID"
wget -qO "$HOME"/.config/balsa/balsa/package.json "$DOWNLOAD_URL$PACKAGE_JSON_ID"
wget -qO "$HOME"/.config/balsa/balsa/index.js "$DOWNLOAD_URL$INDEX_ID"
wget -qO "$HOME"/.config/balsa/balsa/installer.js "$DOWNLOAD_URL$INSTALLER_ID"

echo -e "\e[34mÀ la recherche de google-drive-ocamlfuse\e[0m"

GDO="$(get_command google-drive-ocamlfuse)" && {
    echo -e "\e[34mgoogle-drive-ocamlfuse a été trouvé\e[0m"
} || {

    echo -e "\e[34mgoogle-drive-ocamlfuse n'a pas été trouvé\e[0m"
    echo -e "\e[34mInstallation de google-drive-ocamlfuse.\e[0m"

    [ "$DEBIAN" = "true" ] && echo -e "\e[34mEnvironnement Ubuntu/Debian il semble: ajout du repo\e[0m" && {        

        sudo apt-get -y install software-properties-common &&
        sudo add-apt-repository -y ppa:alessandro-strada/ppa && \
        sudo apt-get -y update && \
        sudo apt-get -y install google-drive-ocamlfuse && INSTALL_SUCCESS="true"

        INSTALLER_FOUND="true"
    }

    [ "$INSTALLER_FOUND" = "false" ] && {

        [ "$OPENSUSE" = "true" ] && echo -e "\e[34mEnvironnement openSUSE.\e[0m" && {
            grep -i '^name=' /etc/os-release | grep -qvi tumbleweed && echo -e "\e[91mLa version n'est pas Tumbleweed: arrêt du programme\e[0m" && exit 1 || RETVAL=0

            zypper repos | grep -q devel_languages_ocaml || {
                sudo zypper -n addrepo https://download.opensuse.org/repositories/devel:languages:ocaml/openSUSE_Tumbleweed/devel:languages:ocaml.repo
                RETVAL=$?
            }
            (( $RETVAL == 0 )) && \
            sudo zypper -n refresh && \
            sudo zypper -n install google-drive-ocamlfuse && INSTALL_SUCCESS="true"

            INSTALLER_FOUND="true"
        }

    }

    [ "$INSTALLER_FOUND" = "false" ] && echo -e "\e[91mImpossible de trouver un installateur pour google-drive-ocamlfuse. Arrêt du programme.\e[0m" && exit 1

    [ "$INSTALL_SUCCESS" = "false" ] && echo -e "\e[91mL'installation de google-drive-ocamlfuse n'a pu être complétée. Arrêt du programme.\e[0m" && exit 1

    GDO="$(get_command google-drive-ocamlfuse)" || {
        echo -e "\e[91mL'utilitaire google-drive-ocamlfuse toujours introuvable. Une erreur est survenue à l'installation. Arrêt du programme.\e[0m"
        exit 1
    }

}

echo -e "\e[34mÀ la recherche de Node\e[0m"
NODE="$(get_command node)" && {
    echo -e "\e[34mNode a été trouvé\e[0m"
    echo -e "\e[34mVersion de Node: $(node --version)\e[0m"
} || {
    echo -e "\e[34mNode n'a pas été trouvé\e[0m"
    echo -e "\e[34mInstallation de Node.\e[0m"

    #We need NVM
    NVM="$(get_command nvm)" || {

        wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION_NEEDED/install.sh | bash

        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

        NVM="$(get_command nvm)" || {
            echo -e "\e[91mLe programme d'installation de NVM n'a pas été trouvé. Impossible d'installer Node. Arrêt du programme.\e[0m"
            exit 1
        }

    }

    $NVM install "$NODE_VERSION_PREFERED"

    NODE="$(get_command node)" || {
        echo -e "\e[91mNode n'a pu être installé. Arrêt du programme.\e[0m"
        exit 1
    }

}

echo -e "\e[34mÀ la recherche de Git\e[0m"
GIT="$(get_command git)" && {
    echo -e "\e[34mGit a été trouvé\e[0m"
    echo -e "\e[34mVersion de Git: $(git --version)\e[0m"
} || {
    echo -e "\e[34mGit n'a pas été trouvé\e[0m"
    echo -e "\e[34mInstallation de Git.\e[0m"

    #We need NVM
    NVM="$(get_command nvm)" || {

        wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION_NEEDED/install.sh | bash

        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

        NVM="$(get_command nvm)" || {
            echo -e "\e[91mLe programme d'installation de NVM n'a pas été trouvé. Impossible d'installer Node. Arrêt du programme.\e[0m"
            exit 1
        }

    }

    $NVM install "$NODE_VERSION_PREFERED"

    NODE="$(get_command node)" || {
        echo -e "\e[91mNode n'a pu être installé. Arrêt du programme.\e[0m"
        exit 1
    }

}

NPM="$(get_command npm)"

cd "$HOME"/.config/balsa/balsa

$NPM install -g
$NODE installer.js



#REMOVE
exit

echo
echo -e "\e[34mA few questions before we proceed...\e[0m"
echo -e "\e[34mWe will connect your Google Drive accounts to this computer.\e[0m"
echo

mkdir -p "$HOME"/cloud
declare -a GOOGLE_ACCOUNTS
GOOGLE_ACCOUNTS=($(ls -d "$HOME"/cloud))

while true
read -p $'\e[93mPlease enter a new Gmail or Google Suite address (or "q" if you are done):\e[0m ' answer
do
  [  $answer = 'q' ] || [  $answer = 'Q' ] && break || {
      echo -e "\e[34mSetting up account [$answer]"
      containsElement "$answer" "${GOOGLE_ACCOUNTS[@]}" && echo "Account already setup" && continue
      mkdir -p "$HOME/cloud/$answer"
      $GDO -label "$answer" "$HOME/cloud/$answer" && {     
        GOOGLE_ACCOUNTS="$(trim "$answer $GOOGLE_ACCOUNTS")"
        GOOGLE_ACCOUNTS=("$(trim "$answer")" "${GOOGLE_ACCOUNTS[@]}")
      } || {
          echo "Error setting up account [$answer]"
      }
  }
done
echo -e "\e[34mWe are done setting up the accounts ["${GOOGLE_ACCOUNTS[@]}"]\e[0m"

[ -z  ""${GOOGLE_ACCOUNTS[@]}"" ] && echo -e "\e[91mOh noes, no Google account entered... Quitting\e[0m" && { exit 1; }

MOUNTCOMMAND='automount_googledrive "'"${GOOGLE_ACCOUNTS[@]}"'" >"'$HOME'"/.config/balsa/logs/automount_googledrive.log 2>&1'
touch "$HOME"/.profile
change_or_add_line "$HOME"/.profile "$MOUNTCOMMAND &" "automount_googledrive"
#grep -q automount_googledrive "$HOME"/.profile || printf "%s &" $MOUNTCOMMAND >>$HOME/.profile
$MOUNTCOMMAND

echo -e "\e[42m\e[30mSuccess! Try typing [balsa] at the command line now\e[0m"