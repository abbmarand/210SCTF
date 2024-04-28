<script lang="ts">
    import Cookies from "js-cookie";
    import { onMount } from "svelte";
    import axios, { AxiosHeaders } from "axios";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    let apidomain = "https://ctfdb.rustalytics.com";
    let file: string = "";
    let content: string = "";
    let todos: any[] = [];
    async function createtodo() {
        const data = await axios.post(
            `${apidomain}/create?auth=${Cookies.get("session")}`,
            {
                name: file,
                content,
            },
        );
        if (data.data !== "noauth") {
            updatetodos();
            file = "";
            content = "";
        } else {
            const id = (
                await axios.get(
                    `${apidomain}/createsession?auth=${Cookies.get("session")}`,
                )
            ).data;
            Cookies.set("session", id, { expires: 0.1, secure: true });
            updatetodos();
        }
    }
    async function updatetodos() {
        let newtodos = [];
        let files = await axios.post(
            `${apidomain}/list?auth=${Cookies.get("session")}`,
            { where: "./" },
        );
        if (files.data !== "noauth") {
            const filearray = files.data.split("\n");
            for (const file of filearray) {
                const content = (
                    await axios.post(
                        `${apidomain}/view?auth=${Cookies.get("session")}`,
                        { todo: file },
                    )
                ).data;
                newtodos.push({ file, content });
            }
            todos = newtodos;
        } else {
            const id = (
                await axios.get(
                    `${apidomain}/createsession?auth=${Cookies.get("session")}`,
                )
            ).data;
            Cookies.set("session", id, { expires: 0.1, secure: true });
            updatetodos();
        }
    }
    onMount(async () => {
        if (Cookies.get("session")) {
            updatetodos();
        } else {
            const id = (
                await axios.get(
                    `${apidomain}/createsession?auth=${Cookies.get("session")}`,
                )
            ).data;
            Cookies.set("session", id, { expires: 0.1, secure: true });
        }
    });
</script>

<main
    class="bg-zinc-950 overflow-auto h-screen text-white flex justify-center ove"
>
    <div class="mt-14">
        <h1 class="text-4xl">The Best todo manager</h1>
        <p class="my-4">
            This todo manager is build with the latest and greatest technologies
            including the new javascript runtime Bun. <br /> Now there is not
            even a need for a database anymore! <br /> Might not work in firefox,
            use Chrome
        </p>

        <form class="flex w-full max-w-sm items-center space-x-2">
            <Input
                bind:value={file}
                type="text"
                class="text-black"
                placeholder="name"
            />
            <Input
                bind:value={content}
                type="text"
                class="text-black"
                placeholder="description"
            />
            <Button on:click={createtodo}>Add todo</Button>
        </form>
        <div class="flex flex-col text-white">
            {#each todos as todo}
                {#if todo.file !== "" || todo.file !== ""}
                    <div
                        class="flex flex-col p-4 my-4 border border-white rounded-md"
                    >
                        <h3 class="text-4xl">
                            {todo.file}
                        </h3>
                        <p class="text-xl">
                            {todo.content}
                        </p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</main>
