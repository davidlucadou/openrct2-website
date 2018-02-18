#!/usr/bin/python3
import subprocess
import datetime
import shlex
import json
import re

def main(rct_path, info_path):
	openrct2_path = rct_path
	server_info_path = info_path
	version = ''
	
	# Get the version of OpenRCT2
	cmd = openrct2_path + ' --version' # Note: 'openrct2.exe --version' doesn't work, hence the Linux requirement (not sure if this works on Mac or not, but you shouldn't run a dedicated server on OS X anyway...)
	cmd = shlex.split(cmd)
	p = subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()
	version_output = p[0].decode()
	regex = re.search(r'[v]([0-9\.]+)', version_output)
	version = regex.group(1) #group(0) returns "vX.X.X", group(1) returns "X.X.X"

	# Put information into json format
	server_data = {}
	server_data['version'] = version_output
	server_data['lastUpdated'] = datetime.datetime.now()
	
	# Set JSONEncoder to be able to parse datetime objects properly
	# https://stackoverflow.com/a/32224522
	json.JSONEncoder.default = lambda self,obj: (obj.isoformat() if isinstance(obj, datetime.datetime) else None)
	
	# Write to file
	with open(server_info_path, 'w') as file:
		json.dump(server_data, file)

if __name__ == '__main__':
	# Customize these values before running the script
	# Insert the full path to your server's openrct2 executable here, i.e. /usr/share/openrct2/openrct2
	# Note that this must be to the openrct2 executable itself, not the directory in which it resides, to allow non-standard names for the executable
	server_path = ''
	# Insert the path to the file to write the version to. I recommend putting it where it can be accessed by a web browser, i.e. https://your.domain.here/res/server_version.json
	version_path = ''
	main(server_path, version_path)