# OpenRCT2 Server Website Template

An easy to setup website template for your OpenRCT2 server.
This website displays the server version and can be easily customized with links to your own website, Discord, Twitch, YouTube, etc.
Because version numbers can be difficult to determine through the server list, the server version is nicely displayed on the website.
This project is based off of the website used by the OpenRCT2 project at https://openrct2.io/

## Getting Started

### Prerequisites
To use this, you will need:
1. A Linux server, running...
2. A web server
3. An OpenRCT2 server (preferably on the same server, but you could adjust it to run on a different one)

### Installing
1. Running development builds? Modify the "Download OpenRCT2" link in index.html to reflect that (there is a link in the comments to the build page so you can easily swap it out).
2. Insert your server address in the "Server Address (Click Here)" link in index.html. Make sure to put it in href="" and the "this.textContent = ". Putting it in the href="" ensures text-only browsers will also see the server address when they hover over the link.
3. Want to use your own favicon? Just overwrite img/favicon.ico and img/favicon.png.
4. Put everything except the folder "py" into your webserver's folder.
5. Setup the index.html and error pages (error pages are optional and setup will differ for each webserver).
6. Open py/update-server-info.py in your editor of choice and modify the lines immediately proceeding the call to main() so that the paths to the OpenRCT2 executable and servers.json file on the webserver are correct.
7. Copy update-server-info.py out of py/ and put it wherever you want.
8. Test out the Python script and verify the webserver's servers.json file contains correct information.
9. Create a Cron job or other scheduled task for it (note: depending on the system, you might have to create a shell script that runs the Python script; you can use py/run-update-server-info as a template).
10. Enjoy your OpenRCT2 webserver!

## FAQ
* Why does this require Linux?
	* The Windows version of OpenRCT2 does not support command line flags; that is, "openrct2.exe --version" just launches the game, it does not give any version information.
	* I do not own a Mac or have easy access to one to test this out on. If anyone would like to put in a pull request after verifying OS X builds have the --version parameter, I'll add OS X compatibility.
	* If future Windows builds have the --version parameter, please put in a pull request and I'll add that to the list.
* Why does this have to run on the same box as my server?
	* To run commands on another Linux system to poll the server version would require working with SSH, which introduces its own can of worms. At least in the initial release, I am not supporting this.
	* Alternatively, the servers could be polled locally and have an FTP/webserver for copying the servers.json file over, but again, I'm not supporting this in the initial release.
* Is there a status indicator for if the server is online/offline?
  * Not at this time, but it is one of my higher priorities for this project.
* Are there any command line parameters for the Python script?
	* Not at this time. However, I do plan on supporting this in the future.
* Does this support multiple servers?
	* Not at this time. I might support this eventually, but I think I should wait until the project is more mature and has a proper API for polling multiple instances.
* Why did you include the server version on the webpage?
	* So you don't have to launch the client find out a server is running an older version and then have to download the older version. It serves a purpose.
* Why doesn't py/run-update-server-info have a .sh extension?
  * I removed it because Cron jobs (at least on Debian-based distros) cannot have any special characters except for "-" and "_", meaning you cannot have any file extensions. If I did put in an extension, it would be skipped.
* Where can I see an example of a server running this?
	* https://rct.lunamoona.tv/
  
## License

This project is licensed under the GNU GPLv3 - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* The OpenRCT2 team for making OpenRCT2, as well as a pretty awesome web design that I based this off of.
* All the people on Stack Overflow who had excellent solutions and endless advice.
* Chris Sawyer, for creating such a timeless game.