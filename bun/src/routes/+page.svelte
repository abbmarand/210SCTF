<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { dev } from "$app/environment";
    import axios, { AxiosHeaders } from "axios";
    let apidomain = "http://localhost:3000";

    let todos: any[] = [];
    if (!dev) {
        apidomain = "ctfdb.rustalytics.com";
    }
    let file: string = "";
    let content: string = "";
    async function createtodo() {
        const data = await axios.post(`${apidomain}/echo`, {
            file,
            content,
        });
        updatetodos();
        file = "";
        content = "";
    }
    async function updatetodos() {
        let newtodos = []
        const files = (await axios.post(`${apidomain}/ls`, {"path":"files"})).data.split("\n")
        for (const file of files){
            const content = (await axios.post(`${apidomain}/cat`, {"path":file})).data
            newtodos.push({file, content})
      
        }
        todos = newtodos
    }
    onMount(async () => {
        updatetodos();
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
