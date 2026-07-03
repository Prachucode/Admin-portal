<script>
    let {data} = $props()
</script>


<h1 class="text-3xl font-bold mb-6">
    Dashboard
</h1>

<p class="text-gray-500 mb-8">
    Welcome back, Admin 👋
</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500">Members</p>
        <h2 class="text-4xl font-bold mt-2">{data.members}</h2>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500">Projects</p>
        <h2 class="text-4xl font-bold mt-2">{data.projects}</h2>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500">Blogs</p>
        <h2 class="text-4xl font-bold mt-2">{data.blogs}</h2>
    </div>

</div>