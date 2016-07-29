---
layout: page
title: About Me
description: something about me
cv: enable
menu: About
permalink: /about
---
{% assign current_year = site.time | date: '%Y' %}

# {{site.name}}

## Base Information


- Organization: [{{ site.organization }}]({{site.organization_url}})
- Location: {{ site.location }}

## Contact

- Email: [{{site.email}}](mailto://{{site.email}})
- Website: [http://zale.site](http://zale.site)
- GitHub: [@{{site.github_account}}](https://github.com/{{site.github_account}})
{% for social in site.socials %}- {{social.type}}: [@{{social.account}}]({{social.home}})
{% endfor %}

## Relative Links

- Published PPT: [http://ppt.zale.site](http://ppt.zale.site)
- No.1 team's redmine: [http://redmine.zale.site](http://redmine.zale.site)
- Project done by myself - zhazha.pw: [http://zhazha.zale.site](http://zhazha.zale.site)
 


## Skill Keywords

### Software Engineer Keywords
<div class="btn-inline">
    {% for keyword in site.skill_software_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>

### Web Developer Keywords
<div class="btn-inline">
    {% for keyword in site.skill_web_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>

### J2EE Developer Keywords
<div class="btn-inline">
    {% for keyword in site.skill_j2ee_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>

### Mobile Developer Keywords
<div class="btn-inline">
    {% for keyword in site.skill_mobile_app_keywords %}
    <button class="btn btn-outline" type="button">{{ keyword }}</button>
    {% endfor %}
</div>

## Current Work List

- [ ] Auction Website Implement
    - [x] Requirement and Fesign 
    - [x] Database Design
    - [x] Front-end Design and Implement
    - [x] Back-end Implement
    - [ ] System Integration
    - [ ] Test
