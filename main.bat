@echo off

:a
deno run --allow-net --allow-read --allow-write main.ts
pause
goto a