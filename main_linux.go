//go:build linux

package main

//go:generate go install github.com/admpub/bindata/v3/go-bindata@latest
//go:generate go-bindata -fs -o bindata_assetfs.go -ignore "[\\/]combined([\\/].*)?$" -ignore "\\.(git|svn|DS_Store|less|scss|gitkeep|go)$" -minify "\\.(js|css)$" -tags bindata -prefix "vendor/github.com/nging-plugins/caddymanager/|vendor/github.com/nging-plugins/collector/|vendor/github.com/nging-plugins/dbmanager/|vendor/github.com/nging-plugins/ddnsmanager/|vendor/github.com/nging-plugins/dlmanager/|vendor/github.com/nging-plugins/frpmanager/|vendor/github.com/nging-plugins/ftpmanager/|vendor/github.com/nging-plugins/servermanager/|vendor/github.com/nging-plugins/sshmanager/|vendor/github.com/nging-plugins/webauthn/|vendor/github.com/nging-plugins/firewallmanager/" public/assets/... template/... config/i18n/... vendor/github.com/nging-plugins/caddymanager/template/... vendor/github.com/nging-plugins/caddymanager/public/assets/... vendor/github.com/nging-plugins/collector/template/... vendor/github.com/nging-plugins/collector/public/assets/... vendor/github.com/nging-plugins/dbmanager/template/... vendor/github.com/nging-plugins/dbmanager/public/assets/... vendor/github.com/nging-plugins/ddnsmanager/template/... vendor/github.com/nging-plugins/dlmanager/template/... vendor/github.com/nging-plugins/frpmanager/template/... vendor/github.com/nging-plugins/ftpmanager/template/... vendor/github.com/nging-plugins/servermanager/template/... vendor/github.com/nging-plugins/sshmanager/template/... vendor/github.com/nging-plugins/webauthn/template/... vendor/github.com/nging-plugins/firewallmanager/template/...

import (
	"github.com/nging-plugins/firewallmanager"
	_ "github.com/nging-plugins/firewallmanager/application/registry/servermanager"
)

func init() {
	modules = append(modules, &firewallmanager.Module)
}
