@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"

title WebLab - Lokale Vorschau
if not defined WEBLAB_PORT set "WEBLAB_PORT=3000"
set "WEBLAB_URL=http://localhost:%WEBLAB_PORT%"
set "WEBLAB_SOURCE=%~dp0."
set "WEBLAB_RUNTIME=%LOCALAPPDATA%\WebLab\LokaleVorschau"

echo.
echo  WebLab - lokale Vorschau
echo  =========================
echo.

rem Die vielen technischen Bibliotheken liegen bewusst lokal auf C:.
rem Dadurch startet WebLab auch aus Google Drive schnell und zuverlässig.
if not exist "%WEBLAB_RUNTIME%" mkdir "%WEBLAB_RUNTIME%"

echo  Aktuelle WebLab-Dateien werden übernommen ...
robocopy "%WEBLAB_SOURCE%" "%WEBLAB_RUNTIME%" /E /R:1 /W:1 /NFL /NDL /NJH /NJS /NP /XD ".git" "node_modules" "node_modules.*" "dist" "build" "work" "outputs" ".vinext" ".wrangler" /XF "*.log" >nul
if errorlevel 8 (
  echo.
  echo  FEHLER: Die WebLab-Dateien konnten nicht vorbereitet werden.
  echo.
  pause
  exit /b 1
)

rem Wenn WebLab bereits läuft, wurden Änderungen trotzdem synchronisiert.
powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -Uri '%WEBLAB_URL%' -TimeoutSec 2 ^| Out-Null; exit 0 } catch { exit 1 }"
if not errorlevel 1 (
  echo  WebLab läuft bereits unter %WEBLAB_URL%
  if not defined WEBLAB_NO_BROWSER start "" "%WEBLAB_URL%"
  exit /b 0
)

rem Zuerst eine normale Node.js-Installation verwenden, sonst die Codex-Laufzeit.
set "NODE_EXE="
for /f "delims=" %%I in ('where node.exe 2^>nul') do if not defined NODE_EXE set "NODE_EXE=%%I"
if not defined NODE_EXE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not defined NODE_EXE (
  echo  FEHLER: Node.js wurde nicht gefunden.
  echo.
  echo  Bitte installieren Sie Node.js oder starten Sie WebLab einmal über Codex.
  echo  Danach kann diese Datei wieder per Doppelklick verwendet werden.
  echo.
  pause
  exit /b 1
)

set "INSTALL_NEEDED=0"
if not exist "%WEBLAB_RUNTIME%\.weblab-bibliotheken-bereit" set "INSTALL_NEEDED=1"
if not exist "%WEBLAB_RUNTIME%\node_modules\vinext\dist\cli.js" set "INSTALL_NEEDED=1"

if "%INSTALL_NEEDED%"=="1" (
  echo  Die benötigten Bibliotheken werden einmalig lokal vorbereitet ...
  set "PACKAGE_MANAGER="
  for /f "delims=" %%I in ('where npm.cmd 2^>nul') do if not defined PACKAGE_MANAGER set "PACKAGE_MANAGER=%%I"

  pushd "%WEBLAB_RUNTIME%"
  if defined PACKAGE_MANAGER (
    call "%PACKAGE_MANAGER%" install --no-audit --no-fund
  ) else if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" (
    call "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" install --force --no-lockfile
  ) else (
    popd
    echo.
    echo  FEHLER: Die Projekt-Bibliotheken konnten nicht installiert werden.
    echo  Bitte starten Sie WebLab einmal über Codex.
    echo.
    pause
    exit /b 1
  )
  set "INSTALL_RESULT=%ERRORLEVEL%"
  popd

  if not "%INSTALL_RESULT%"=="0" (
    echo.
    echo  FEHLER: Die Vorbereitung wurde nicht erfolgreich abgeschlossen.
    echo.
    pause
    exit /b 1
  )

  >"%WEBLAB_RUNTIME%\.weblab-bibliotheken-bereit" echo WebLab-Bibliotheken sind vorbereitet.
)

if not exist "%WEBLAB_RUNTIME%\node_modules\vinext\dist\cli.js" (
  echo.
  echo  FEHLER: WebLab wurde nicht vollständig vorbereitet.
  echo  Bitte starten Sie die Datei erneut oder verwenden Sie Codex.
  echo.
  pause
  exit /b 1
)

echo  WebLab startet unter %WEBLAB_URL%
echo  Dieses Fenster bitte geöffnet lassen.
echo  Zum Beenden drücken Sie hier Strg+C.
echo.

if not defined WEBLAB_NO_BROWSER start "" powershell -WindowStyle Hidden -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process '%WEBLAB_URL%'"
pushd "%WEBLAB_RUNTIME%"
set "WRANGLER_LOG_PATH=.wrangler\wrangler.log"
"%NODE_EXE%" "node_modules\vinext\dist\cli.js" dev --host 127.0.0.1 --port %WEBLAB_PORT%
popd

echo.
echo  WebLab wurde beendet.
pause

