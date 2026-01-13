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
```
[submodule "[html-common]"]
	path = [html-common]
	url = https://github.com/ldpercy/html-common
	branch = main
```

### Local dev

> [!WARNING]
> Not working yet - see problems with file transport


To use a local dev copy:
```bash
git config --local submodule."[html-common]".url /local/path/to/html-common/
```
Or in `superproject/.git/config`:
```
[submodule "[html-common]"]
	url = /local/path/to/html-common/
```

### Maintenance

	git submodule update



Problems
--------

### 'file' not allowed

	Cloning into '/local/path/to/superproject/[html-common]'...
	fatal: transport 'file' not allowed
	fatal: clone of '/local/path/to/html-common/' into submodule path '/local/path/to/superproject/[html-common]' failed
	Failed to clone '[html-common]'. Retry scheduled


https://stackoverflow.com/questions/74486167/git-clone-recurse-submodules-throws-error-on-macos-transmission-type-file-n
https://git-scm.com/docs/git-config#Documentation/git-config.txt-protocolallow
https://github.blog/open-source/git/git-security-vulnerabilities-announced/#fn-67904-1


	git config --global protocol.file.allow always



User config
-----------

To set these user-wide:

```bash
git config --global submodule.recurse true
git config --global submodule."[html-common]".url /local/path/to/html-common/
```

In `~/.gitconfig`:
```
[submodule]
	recurse = true
[submodule "[html-common]"]
	url = /local/path/to/html-common/
```