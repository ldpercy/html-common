HTML Common
===========

A git submodule for common HTML, CSS, SVG & JavaScript items.

<p align="center">
	<img width="15%" src="./favicon.svg" alt="HTML Common" title="HTML Common"/>
	<img width="15%" src="./favicon/html.svg" alt="HTML" title="HTML"/>
	<img width="15%" src="./favicon/css.svg" alt="CSS" title="CSS"/>
	<img width="15%" src="./favicon/svg.svg" alt="SVG" title="SVG"/>
	<img width="15%" src="./favicon/javascript.svg" alt="JavaScript" title="JavaScript"/>
</p>


Submodule setup
---------------

> [!IMPORTANT]
> In progress, subject to revision


### Add the submodule to an existing project
Where project is called `superproject`:

```bash
git submodule add https://github.com/ldpercy/html-common [html-common]
git submodule set-branch --branch main "[html-common]
```

Equivalent to in `superproject/.gitmodules`:
```conf
[submodule "[html-common]"]
	path = [html-common]
	url = https://github.com/ldpercy/html-common
	branch = main
```

The submodule commit hash is tracked in (might vary):

* superproject/.git/modules/[html-common]/refs/heads/main
* superproject/.git/modules/[html-common]/refs/remotes/origin/main



### Local development

To use a local development copy of the submodule:
```bash
git config --local protocol.file.allow always
git config --local submodule."[html-common]".url /local/path/to/html-common/

git submodule update		# performs the clone operation
```

Or in `superproject/.git/config`:
```conf
[protocol "file"]
	allow = always
[submodule "[html-common]"]
	url = /local/path/to/html-common/
```


The submodule commit hash is also tracked in `superproject/.git/modules[html-common]/FETCH_HEAD`, eg:

```
1234abcd------commit-hash-------1234abcd		branch 'main' of /local/path/to/html-common
```

#### `.git/modules/[html-common]/config`

It might be necessary to manually edit this file to make sure it's pointing to the local development copy eg:
```conf
[remote "origin"]
	url = /local/path/to/html-common/
	fetch = +refs/heads/*:refs/remotes/origin/*
```






### Maintenance

	git submodule update


### User global config

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


### Troubleshooting


#### 'file' not allowed

	Cloning into '/local/path/to/superproject/[html-common]'...
	fatal: transport 'file' not allowed
	fatal: clone of '/local/path/to/html-common/' into submodule path '/local/path/to/superproject/[html-common]' failed
	Failed to clone '[html-common]'. Retry scheduled


* https://stackoverflow.com/questions/74486167/git-clone-recurse-submodules-throws-error-on-macos-transmission-type-file-n
* https://git-scm.com/docs/git-config#Documentation/git-config.txt-protocolallow
* https://github.blog/open-source/git/git-security-vulnerabilities-announced/#fn-67904-1


	git config --global protocol.file.allow always



