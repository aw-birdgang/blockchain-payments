

# dart install
````

brew tap dart-lang/dart
brew install dart


dart pub global activate fvm
export PATH="$PATH:/usr/local/opt/dart/libexec/bin”
source ~/.bashrc  # 또는 source ~/.bash_profile 또는 source ~/.zshrc

dart --version

https://pub.dev/packages/fvm


````


# flutter install
````

brew install flutter
flutter pub global activate fvm

source ~/.bashrc  # 또는 source ~/.bash_profile 또는 source ~/.zshrc

export PATH="$PATH":"$HOME/flutter/bin"
export PATH="$PATH":"$HOME/bin/cache/dart-sdk/bin"
export PATH="$PATH":"$HOME/.pub-cache/bin"

````




# flutter run
````

fvm releases
fvm use 3.19.5


fvm flutter config --enable-web
fvm flutter run -d chrome --no-injected-client
fvm flutter run -d chrome


````


