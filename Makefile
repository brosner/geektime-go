export GOPATH:=$(shell pwd)

default: all

deps:
	go get -d -v geektime/...

build: deps
	go install geektime/cmd/...

clean:
	rm -rf bin pkg src/github.com

all: build
