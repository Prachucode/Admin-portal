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

<div class="bg-white rounded-xl shadow overflow-hidden">

	<table class="w-full">

		<thead class="bg-gray-100">

			<tr>
				<th class="p-4">Title</th>
				<th class="p-4">Content</th>
				<th class="p-4">Actions</th>
			</tr>

		</thead>

		<tbody>

			{#each data.blogs as blog}

			<tr class="border-t">

				<td class="p-4">{blog.title}</td>

				<td class="p-4">
					{blog.content}
				</td>

				<td class="p-4 flex gap-2">

					<button
						type="button"
						class="bg-yellow-500 text-white px-3 py-1 rounded"
						onclick={() => editBlog(blog)}
					>
						Edit
					</button>

					<form method="POST" action="?/deleteBlog">

						<input
							type="hidden"
							name="id"
							value={blog._id}
						/>

						<button
	type="button"
	class="bg-red-600 text-white px-3 py-1 rounded"
	onclick={() => {
		deleteId = blog._id;
		showDeleteModal = true;
	}}
>
	Delete
</button>

					</form>

				</td>

			</tr>

			{/each}

		</tbody>

	</table>

</div>

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