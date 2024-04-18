<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { dev } from "$app/environment";
    import axios, { AxiosHeaders } from "axios";
    let apidomain = "http://localhost:3000";

    let todos: any[] = [];
    if (!dev) {
        apidomain = "ctfdb.rustalytics.com";
    }
    let name: string = "";
    let content: string = "";
    async function createtodo() {
        const data = await axios.post(`${apidomain}/createtodo`, {
            name,
            content,
        });
        updatetodos();
        console.log(data);
        name = "";
        content = "";
    }
    async function updatetodos() {
        const data = await axios.get(`${apidomain}/gettodos`);
        if (data) {
            todos = data.data;
        }
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
    <input type="text" class="bg-zinc-800" bind:value={name} />
    <input type="text" class="bg-zinc-800" bind:value={content} />
    <button on:click={createtodo}> upload</button>
</main>
