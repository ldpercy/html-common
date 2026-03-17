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


Git submodule setup
-------------------


More info on the [wiki page](<[wiki]/git submodule.md>).

To add `html-common` as a git submodule (I usually use square brackets for the path name):

```bash
git submodule add https://github.com/ldpercy/html-common [html-common]
git submodule update
```

Equivalent to in your project's `.gitmodules`:
```conf
[submodule "[html-common]"]
	path = [html-common]
	url = https://github.com/ldpercy/html-common
```

The square brackets are mainly for cosmetics and grouping.


