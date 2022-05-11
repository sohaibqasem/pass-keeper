
![react-DraftJs-Demo - Animated gif demo](src/demo/pass-keeper-logo.png)
# pass-keeper
Node CLI tool for generate and store passwords securely with one **master key**

## Quick start
```sh
npx passkpr
npx passkpr [app-name]
npx passkpr [app-name] [master-password]
```

![react-DraftJs-Demo - Animated gif demo](src/demo/pass-keeper.png)

## work flow

pass-keeper (folder)
----------------------------------------------------------
	config.json
		{
			"publicSecretKey": "32-char"
		}
	passwords.json
		[
			{
			"appname":"string",
			"username":"string",
			"email":"string",
			"password":"string-encripted"
			}	
		]
----------------------------------------------------------

Two Cases
---------
Check if pass-keeper (folder) already installed 
First-time(in Device)
---------------------
	- create pass-keeper folder with all setup file
	- generate a public secret key 32-char (saved to confing.json)
	- ask user to eneter his master key for the fist time(to clipboard)
	- calc secret key
	- mainMenu
Already installed(in Device)
----------------------------
	- read a public secret key 32-char (from confing.json)
	- ask user to eneter his master key
	- calc secret key
	- mainMenu

MainMenu
--------

Generate a new password
-----------------------
- readPasswords
- inquirerPassKeeperObj appname, username, email
- generate a new password
- encrypt password with secret key
- update passwords list


Custom new password
-------------------
- readPasswords
- inquirerPassKeeperObj appname, username, email, password
- encrypt password with secret key
- update passwords list


List all passwords
------------------
- readPasswords
- decrypt passwords with secret key
- print it to the console


Find a password by (App name)
-----------------------------
- readPasswords
- find by name
- decrypt password with secret key
- print it to the console
