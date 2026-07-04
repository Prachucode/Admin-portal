<script>
	let { data, form } = $props();

	let editingBlog = $state({
		_id: "",
		title: "",
		content: ""
	});

	function editBlog(blog) {
		editingBlog = { ...blog };
	}

	function cancelEdit() {
		editingBlog = {
			_id: "",
			title: "",
			content: ""
		};
	}
	let showDeleteModal = $state(false);
	let deleteId = $state("");
</script>

<div class="bg-white rounded-xl shadow p-6 mb-8">

	<h2 class="text-2xl font-semibold mb-4 text-center">
		{editingBlog._id ? "Edit Blog" : "Add Blog"}
	</h2>

	<form
		method="POST"
		action={editingBlog._id ? "?/updateBlog" : "?/addBlog"}
		class="space-y-4"
	>

		<input
			type="hidden"
			name="id"
			value={editingBlog._id}
		/>

		<input
			type="text"
			name="title"
			placeholder="Blog Title"
			class="w-full border rounded-lg p-3"
			required
			bind:value={editingBlog.title}
		/>

		<textarea
			name="content"
			rows="6"
			placeholder="Blog Content"
			class="w-full border rounded-lg p-3"
			required
			bind:value={editingBlog.content}
		></textarea>

		<div class="flex justify-center gap-4">

			<button
				type="submit"
				class="bg-blue-600 text-white px-6 py-3 rounded-lg"
			>
				{editingBlog._id ? "Update Blog" : "Add Blog"}
			</button>

			{#if editingBlog._id}
				<button
					type="button"
					class="bg-gray-500 text-white px-6 py-3 rounded-lg"
					onclick={cancelEdit}
				>
					Cancel
				</button>
			{/if}

		</div>

	</form>

</div>

<h1 class="text-3xl font-bold mb-6">Blogs</h1>

{#if data.blogs.length === 0}

<div class="bg-white rounded-2xl shadow p-10 text-center">

	<h2 class="text-xl font-semibold text-gray-700">
		No Blogs Found
	</h2>

	<p class="mt-2 text-gray-500">
		Add your first blog using the form above.
	</p>

</div>

{:else}

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

	{#each data.blogs as blog}

	<div
		class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
	>

		<h2 class="text-2xl font-bold text-gray-800 mb-4">
			{blog.title}
		</h2>

		<p class="text-gray-600 flex-1 line-clamp-6 whitespace-pre-wrap">
			{blog.content}
		</p>

		<div class="flex gap-3 mt-6">

			<button
				type="button"
				class="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
				onclick={() => editBlog(blog)}
			>
				Edit
			</button>

			<button
				type="button"
				class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
				onclick={() => {
					deleteId = blog._id;
					showDeleteModal = true;
				}}
			>
				Delete
			</button>

		</div>

	</div>

	{/each}

</div>

{/if}

{#if showDeleteModal}

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

	<div class="bg-white rounded-xl p-6 shadow-xl w-96">

		<h2 class="text-xl font-bold mb-3 text-red-600">
			Delete Blog
		</h2>

		<p class="text-gray-600 mb-6">
			Are you sure you want to delete this blog?
		</p>

		<div class="flex justify-end gap-3">

			<button
				type="button"
				class="border rounded-lg px-4 py-2 hover:bg-gray-100"
				onclick={() => (showDeleteModal = false)}
			>
				Cancel
			</button>

			<form method="POST" action="?/deleteBlog">

				<input
					type="hidden"
					name="id"
					value={deleteId}
				/>

				<button
					type="submit"
					class="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700"
				>
					Delete
				</button>

			</form>

		</div>

	</div>

</div>

{/if}