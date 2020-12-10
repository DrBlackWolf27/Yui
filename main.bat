@echo off

:a
deno run --allow-net --allow-read --allow-write --allow-run main.ts
pause
goto a