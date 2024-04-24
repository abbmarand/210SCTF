<script lang="ts">
    import Cookies from 'js-cookie'
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import axios, { AxiosHeaders } from "axios";
    let apidomain = "http://localhost:3001";
    let file: string = "";
    let content: string = "";
    let todos: any[] = [];
    async function createtodo() {
        const data = await axios.post(`${apidomain}/create?auth=${Cookies.get("session")}`, {
            "name":file,
            content,
        });
        if(data.data !==  "noauth"){
            updatetodos();
            file = "";
            content = "";
        }else{
            const id = (await axios.get(`${apidomain}/createsession?auth=${Cookies.get("session")}`)).data
            Cookies.set("session", id,{ expires: 0.1, secure:true })
            window.location.href = window.location.href
        }
        
    }
    async function updatetodos() {
        let newtodos = []
        let files = await axios.post(`${apidomain}/list?auth=${Cookies.get("session")}`, {"where":"./"})
        if(files.data !==  "noauth"){
            const filearray = files.data.split("\n")
            for (const file of filearray){
                const content = (await axios.post(`${apidomain}/view?auth=${Cookies.get("session")}`, {"todo":file})).data
                newtodos.push({file, content})
            }
            todos = newtodos
        }else{
            const id = (await axios.get(`${apidomain}/createsession?auth=${Cookies.get("session")}`)).data
            Cookies.set("session", id,{ expires: 0.1, secure:true })
            window.location.href = window.location.href
        }
       
    }
    onMount(async () => {
        if(Cookies.get("session")){
            updatetodos();
        }else{
            const id = (await axios.get(`${apidomain}/createsession?auth=${Cookies.get("session")}`)).data
            Cookies.set("session", id,{ expires: 0.1, secure:true })
        }
        
    });
</script>

<main class="bg-zinc-950 overflow-auto h-screen text-white">
    hello
    <div class="flex flex-col">
        {#each todos as todo}
            <div class="flex flex-row">
                <p>
                    {todo.file}
                </p>
                <p>
                    {todo.content}
                </p>
            </div>
        {/each}
    </div>
    <input type="text" class="bg-zinc-800" bind:value={file} />
    <input type="text" class="bg-zinc-800" bind:value={content} />
    <button on:click={createtodo}> upload</button>
</main>
