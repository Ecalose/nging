# go install github.com/akavel/rsrc@latest
rsrc -arch amd64 -manifest ico.manifest -o ico/windows/amd64/nging.syso -ico ../../public/assets/backend/images/favicon-lg.ico

rsrc -arch 386 -manifest ico.manifest -o ico/windows/i386/nging.syso -ico ../../public/assets/backend/images/favicon-lg.ico

rsrc -arch arm64 -manifest ico.manifest -o ico/windows/arm64/nging.syso -ico ../../public/assets/backend/images/favicon-lg.ico