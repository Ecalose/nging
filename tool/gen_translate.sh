#go install github.com/admpub/i18n/cmd/fetchtext@latest
fetchtext --src=../ --dist=../config/i18n/messages --default=zh-CN --translate=true --onlyExport=false --translator=tencent --translatorConfig="appid=&secret="
