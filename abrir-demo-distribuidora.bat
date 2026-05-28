@echo off
cd /d "C:\Users\Andre\OneDrive\Documentos\projeto do zerro nova Hamburgueria"
echo Abrindo servidor da demo...
echo.
echo Acesse no navegador:
echo http://127.0.0.1:5177/distribuidora-bebidas/
echo.
echo Mantenha esta janela aberta enquanto estiver usando a demo.
echo Para encerrar, feche esta janela.
echo.
"C:\Program Files\nodejs\node.exe" dev-server.js
pause
