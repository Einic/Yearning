# Get the currently used golang install path (in GOPATH/bin, unless GOBIN is set)
ifeq (,$(shell go env GOBIN))
GOBIN=$(shell go env GOPATH)/bin
else
GOBIN=$(shell go env GOBIN)
endif

# Setting SHELL to bash allows bash commands to be executed by recipes.
# This is a requirement for 'setup-envtest.sh' in the test target.
# Options are set to exit when a recipe line exits non-zero or a piped command fails.
SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec


CWD := $(shell pwd)
PREFIX := v
VERSION := 3.1.7-1
EXECUTABLE := Yearning
GOARCH := amd64
LDFLAGS := "-s -w -X main.version=$(VERSION)"
RELEASE = $(shell date +"%Y%m%d")
KERNEL_VERSION := $(shell uname -r|grep -oP '\.el(\d+)\.' | sed -n 's/\.el\([0-9]\+\)\./el\1/p')
ARCH := $(shell uname -m)

README_SRC_FILE = README.md
README_DEST_FILE = "./bin/README.md"
README_COPY_CMD = cp $(README_SRC_FILE) $(README_DEST_FILE)

CONF_TEMPLATE_SRC_FILE = conf.toml.template
CONF_TEMPLATE_DEST_FILE = "./bin/conf.toml.template"
CONF_TEMPLATE_COPY_CMD = cp $(CONF_TEMPLATE_SRC_FILE) $(CONF_TEMPLATE_DEST_FILE)

.PHONY: all
all: build
    @echo "Building for Linux Kernel Version: $(KERNEL_VERSION)"
    @echo "Building for Architecture: $(ARCH)"

##@ General
ver:
	@echo $(PREFIX)${VERSION}

.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development
.PHONY: manifests
manifests: ## Generate WebhookConfiguration, ClusterRole and CustomResourceDefinition objects.

.PHONY: generate
generate: ## Generate code containing DeepCopy, DeepCopyInto, and DeepCopyObject method implementations.

.PHONY: fmt
fmt: ## Run go fmt against code.
	go fmt ./...

.PHONY: vet
vet: ## Run go vet against code.
	go vet ./...

.PHONY: test
test: manifests generate fmt vet envtest ## Run tests.
	go test ./... -coverprofile cover.out

##@ Build
.PHONY: yarn-install
yarn-install:
	cd gemini-next
	yarn install

.PHONY: yarn-dev
yarn-dev:
	cd gemini-next
	yarn run dev

.PHONY: yarn-serve
yarn-serve:
	cd gemini-next
	yarn run serve

.PHONY: yarn-build
yarn-build:
	cd gemini-next
	yarn run build && cp -r dist ../src/service/

.PHONY: linux-build
#linux-build: generate fmt vet ## Build manager linux binary.
linux-build: ## Build manager linux binary.
	go build -ldflags=$(LDFLAGS) -o bin/$(EXECUTABLE) main.go && find bin/$(EXECUTABLE) -type f -executable | xargs -i upx -qq {}

.PHONY: darwin-build
darwin-build: generate fmt vet ## Build manager darwin binary.
	CGO_ENABLED=0 GOOS=darwin GOARCH=$(GOARCH) go build -ldflags=$(LDFLAGS) -o bin/$(EXECUTABLE) main.go && find bin/$(EXECUTABLE)_darwin -type f -executable | xargs -i upx -qq {}

.PHONY: win-build
win-build: generate fmt vet ## Build manager windows binary.
	CGO_ENABLED=0 GOOS=windows GOARCH=$(GOARCH) go build -ldflags=$(LDFLAGS) -o bin/$(EXECUTABLE).exe main.go && find bin/$(EXECUTABLE).exe -type f -executable | xargs -i upx -qq {}

.PHONY: run
#run: manifests generate fmt vet ## Run a controller from your host.
run:
	go run ./main.go run

.PHONY: build
build: linux-build ## Build manager linux rpm binary.
	$(README_COPY_CMD)
	$(CONF_TEMPLATE_COPY_CMD)
	mkdir -p rpms
	go-bin-rpm generate -f rpm.json -o ./rpms/$(EXECUTABLE)-$(PREFIX)$(VERSION)-$(RELEASE).$(KERNEL_VERSION).$(ARCH).rpm

.PHONY: clean
clean:
	cp ./rpms/*.rpm ./bin
	rm -rf pkg-build rpms

##@ Deployment

ifndef ignore-not-found
  ignore-not-found = false
endif


# npm install -g yarn
# yarn config set registry https://registry.npmmirror.com -g
# yarn config set sass_binary_site https://cdn.npmmirror.com/binaries/node-sass -g

# rpm Install before packaging, Please use the TAB key to replace spaces
# 1. https://github.com/mh-cbon/go-bin-rpm
# 2. yum install -y gcc make rpm-build redhat-rpm-config