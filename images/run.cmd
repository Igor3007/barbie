echo Обработка *.PNG файлов через optipng
xcopy /y /t /c /i "%folder%" "png_%folder%"
for /r %folder% %%a in (*.png) do (
   set fn=%%a&  optipng -o7 %%~a -out %home_path%png_!fn:%~dp0=!
)