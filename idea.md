# Bun Is the Best Javascript runtime!!
### Difficulty: 0.4
### Hosted at ctf.rustalytics.com
# The Idea
The idea is to use the new Javascript runtime [Bun](https://bun.sh/) where they have a way to excecute shell commands trough js which I think is a bad idea from many perspectives

Espesially as it makes it easy to be lazy, for example if you don't know the right way to read a file but you know bash you might just do something like this:

```.js

import { $ } from "bun";

function readfile(file){
  return await await $`cat ${file}`;
}

console.log(redfile(" ./data.txt && rm -rf /* ")) //would break the server

```

In the challange, some lazy shortcut such as this one will be taken and the user will get remote-code excecution where they can find the flag

Therefore it also requires some knowledge in linux.

# The challange

The challange will be a web one where you go to a website where hints will exist in text praising the runtime and that you only need to know Bash and barely Javascript.

The text might look sometging like this

``` 
Bun is the greatest javascript runtime. You don't even need to know javascript anymore.
Imagine using node and writing slow javascript code.
There is not even a database, the linux filesystem is supperior!!!
```

Under the text there will be a todo input with name and content and it will run this code on the backend

```.js
app.post("/craete" async ( req, res ) =>{
  try{
    const {name, content} = data.body
    await await $`touch ${name} && echo ${content} > ${name}`;
    res.send()
  }catch(e){
    res.error(e)
  }
})
```

The solution to this will be this request body:
```json
{"name": "flag","content":"${cat /flag.txt}"}
```
as it will echo the flag.txt into the file with the name
After the user can fetch the todo in the UI as they will all be listed there and see the flag

I will prabably have to add a cookie with uuid so you can only get the files that you uploaded and not go to the website and se someone elses flag

# The difficulty
The difficulty is set to 0.4. This is because we have during our time at Hitachigymnasiet learned about request types and we know how to manipulate them. Most of us have also done a course in linux which will have given us the knowledge to do the cat command and understand how the server would write todos in the filesystem from the hints
