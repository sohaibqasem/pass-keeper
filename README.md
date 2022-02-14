
![react-DraftJs-Demo - Animated gif demo](src/demo/pass-keeper-logo.png)
# pass-keeper
Node CLI tool for generate and store passwords securely with one **master key**

## wahts next
- check the master-password after the user enter it immediately.
- better Exception handling.
- improve performance.
- add new features like clipboard and others.

## quick start
```sh
npx passkpr
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

two Cases
---------
check if pass-keeper (folder) already installed 
first-time(in Device)
---------------------
	- create pass-keeper folder with all setup file
	- generate a public secret key 32-char (saved to confing.json)
	- ask user to eneter his master key for the fist time(to clipboard)
	- calc secret key
	- mainMenu
already installed(in Device)
----------------------------
	- read a public secret key 32-char (from confing.json)
	- ask user to eneter his master key
	- calc secret key
	- mainMenu

mainMenu
--------

generate a new password
-----------------------
- readPasswords
- inquirerPassKeeperObj appname, username, email
- generate a new password
- encrypt password with secret key
- update passwords list


custom new password
-------------------
- readPasswords
- inquirerPassKeeperObj appname, username, email, password
- encrypt password with secret key
- update passwords list


list all passwords
------------------
- readPasswords
- decrypt passwords with secret key
- print it to the console


find a password by (App name)
-----------------------------
- readPasswords
- find by name
- decrypt password with secret key
- print it to the console
