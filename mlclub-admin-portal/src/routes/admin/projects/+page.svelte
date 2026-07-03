<script>
	let { data, form } = $props();

	let editingProject = $state({
		_id: "",
		title: "",
		description: "",
		github: "",
		URL: ""
	});

	function editProject(project) {
		editingProject = { ...project };
	}

	function cancelEdit() {
		editingProject = {
			_id: "",
			title: "",
			description: "",
			github: "",
			URL: ""
		};
	}
	let showDeleteModal = $state(false);
	let deleteId = $state("");
</script>

<div class="bg-white rounded-xl shadow p-6 mb-8">

	<h2 class="text-2xl font-semibold mb-4 text-center">
		{editingProject._id ? "Edit Project" : "Add Project"}
	</h2>

	<form
		method="POST"
		action={editingProject._id ? "?/updateProject" : "?/addProject"}
		class="space-y-4"
	>

		<input
			type="hidden"
			name="id"
			bind:value={editingProject._id}
		/>

		<input
			type="text"
			name="title"
			placeholder="Project Title"
			class="w-full border rounded-lg p-3"
			required
			bind:value={editingProject.title}
		/>

		<textarea
			name="description"
			rows="5"
			placeholder="Project Description"
			class="w-full border rounded-lg p-3"
			required
			bind:value={editingProject.description}
		></textarea>

		<input
			type="url"
			name="github"
			placeholder="Github Repository"
			class="w-full border rounded-lg p-3"
			bind:value={editingProject.github}
		/>

		<input
			type="url"
			name="URL"
			placeholder="Live Project URL"
			class="w-full border rounded-lg p-3"
			bind:value={editingProject.URL}
		/>

		<div class="flex justify-center gap-4">

			<button
				type="submit"
				class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
			>
				{editingProject._id ? "Update Project" : "Add Project"}
			</button>

			{#if editingProject._id}
				<button
					type="button"
					class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
					onclick={cancelEdit}
				>
					Cancel
				</button>
			{/if}

		</div>

	</form>

	{#if form?.error}
		<p class="mt-4 rounded bg-red-100 p-3 text-red-700">
			{form.error}
		</p>
	{/if}

	{#if form?.success}
		<p class="mt-4 rounded bg-green-100 p-3 text-green-700">
			Project added successfully.
		</p>
	{/if}

</div>

<h1 class="text-3xl font-bold mb-6">Projects</h1>

<div class="bg-white rounded-xl shadow overflow-x-auto">

	<table class="w-full">

		<thead class="bg-gray-100">

			<tr>
				<th class="p-4 text-left">Title</th>
				<th class="p-4 text-left">Description</th>
				<th class="p-4 text-left">Github</th>
				<th class="p-4 text-left">Live URL</th>
				<th class="p-4 text-left">Actions</th>
			</tr>

		</thead>

		<tbody>

			{#if data.projects.length === 0}

				<tr>
					<td colspan="5" class="p-6 text-center">
						No Projects Found
					</td>
				</tr>

			{:else}

				{#each data.projects as project}

					<tr class="border-t">

						<td class="p-4">
							{project.title}
						</td>

						<td class="p-4">
							{project.description}
						</td>

						<td class="p-4">
							<a
								href={project.github}
								target="_blank"
								class="text-blue-600 underline"
							>
								Github
							</a>
						</td>

						<td class="p-4">
							<a
								href={project.URL}
								target="_blank"
								class="text-green-600 underline"
							>
								Visit
							</a>
						</td>

						<td class="p-4 flex gap-2">

							<button
								type="button"
								class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
								onclick={() => editProject(project)}
							>
								Edit
							</button>

							<form
								method="POST"
								action="?/deleteProject"
							>

								<input
									type="hidden"
									name="id"
									value={project._id}
								/>

								<button
	type="button"
	class="bg-red-600 text-white px-3 py-1 rounded"
	onclick={() => {
		deleteId = project._id;
		showDeleteModal = true;
	}}
>
	Delete
</button>

							</form>

						</td>

					</tr>

				{/each}

			{/if}

		</tbody>

	</table>

</div>


{#if showDeleteModal}

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

	<div class="bg-white rounded-xl p-6 shadow-xl w-96">

		<h2 class="text-xl font-bold mb-3 text-red-600">
			Delete project
		</h2>

		<p class="text-gray-600 mb-6">
			Are you sure you want to delete this project?
		</p>

		<div class="flex justify-end gap-3">

			<button
				type="button"
				class="border rounded-lg px-4 py-2 hover:bg-gray-100"
				onclick={() => (showDeleteModal = false)}
			>
				Cancel
			</button>

			<form method="POST" action="?/deleteProject">

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