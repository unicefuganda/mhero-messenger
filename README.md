mhero-messenger
===============

[![Build Status](https://snap-ci.com/unicefuganda/mhero-messenger/branch/master/build_image)](https://snap-ci.com/unicefuganda/mhero-messenger/branch/master)

Setup development environment
-----------------------------

After 'git clone' the repository, do following in your working directory:

Prepare your environment:

* (Make sure you have NodeJS installed)
* npm install -g grunt-cli
* npm install

Run test:

* cp config/hero-auth-config.sample.json config/hero-auth-config.json
* (edit config/hero-auth-config.json to fit your config)
* grunt 

Start server:

* ./scripts/server.js
* (Access http://localhost:8000)

Run at staging server
---------------------

* (Get LiberiaHWR.pem from Carl and copy it to ~/.ssh/ folder.)
* ssh -i ~/.ssh/LiberiaHWR.pem -l ubuntu liberia-staging.mhero.org
* cd node/mhero-messenger/
* git pull
* (Make sure config/hero-auth-config.json is what you want.)
* forever restartall (Run the latest revision.) 
* access it at http://liberia-staging.mhero.org:5001/messenger/landing_page.html
