HTML Common
===========

A git submodule for common HTML items.


> [!IMPORTANT]
> In progress, subject to revision



Superproject
------------

### Setup



```bash
git submodule add https://github.com/ldpercy/html-common [html-common]
git submodule set-branch --branch main "[html-common]
```

In `superproject/.gitmodules`:
```conf
[submodule "[html-common]"]
	path = [html-common]
	url = https://github.com/ldpercy/html-common
	branch = main
```

### Local dev


To use a local development copy of the submodule:
```bash
git config --local protocol.file.allow always
git config --local submodule."[html-common]".url /local/path/to/html-common/
```

Or in `superproject/.git/config`:
```conf
[protocol "file"]
	allow = always
[submodule "[html-common]"]
	url = /local/path/to/html-common/
```


### Maintenance

	git submodule update



User global config
------------------

To set some of these user-wide:


```bash
git config --global submodule.recurse true
git config --global protocol.file.allow always
git config --global submodule."[html-common]".url /local/path/to/html-common/
```

Equivalent to in `~/.gitconfig`:
```conf
[submodule]
	recurse = true
[protocol "file"]
	allow = always
[submodule "[html-common]"]
	url = /local/path/to/html-common/
```


Problems
--------

### 'file' not allowed

	Cloning into '/local/path/to/superproject/[html-common]'...
	fatal: transport 'file' not allowed
	fatal: clone of '/local/path/to/html-common/' into submodule path '/local/path/to/superproject/[html-common]' failed
	Failed to clone '[html-common]'. Retry scheduled


* https://stackoverflow.com/questions/74486167/git-clone-recurse-submodules-throws-error-on-macos-transmission-type-file-n
* https://git-scm.com/docs/git-config#Documentation/git-config.txt-protocolallow
* https://github.blog/open-source/git/git-security-vulnerabilities-announced/#fn-67904-1


	git config --global protocol.file.allow always



