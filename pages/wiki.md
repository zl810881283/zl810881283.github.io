---
layout: page
title: Wiki
subtitle: <h2><span class="mega-octicon octicon-book"></span>&nbsp;&nbsp; Personal wiki </h2>
keywords: Wiki, 维基
description: Wiki
comments: false
menu: Wiki
permalink: /wiki/
---

# Wiki

> how many hot key will make brain explode?

<ul>
    {% for wiki in site.wiki %}
    {% if wiki.title != "Wiki Template" %}
    <li><a href="{{ wiki.url }}">{{ wiki.title }}</a></li>
    {% endif %}
    {% endfor %}
</ul>
