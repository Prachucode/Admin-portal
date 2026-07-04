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

{#if data.projects.length === 0}

<div class="bg-white rounded-2xl shadow p-10 text-center">

	<h2 class="text-xl font-semibold text-gray-700">
		No Projects Found
	</h2>

	<p class="mt-2 text-gray-500">
		Add your first project using the form above.
	</p>

</div>

{:else}

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

	{#each data.projects as project}

	<div
		class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
	>

		<h2 class="text-2xl font-bold text-gray-800 mb-3">
			{project.title}
		</h2>

		<p class="text-gray-600 flex-1">
			{project.description}
		</p>

		<div class="flex gap-3 mt-6">

			{#if project.github}

			<a
				href={project.github}
				target="_blank"
				class="flex-1 text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
			>
				GitHub Repo
			</a>

			{/if}

			{#if project.URL}

			<a
				href={project.URL}
				target="_blank"
				class="flex-1 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
			>
				Live URL
			</a>

			{/if}

		</div>

		<div class="flex gap-3 mt-5">

			<button
				type="button"
				class="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
				onclick={() => editProject(project)}
			>
				Edit
			</button>

			<button
				type="button"
				class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
				onclick={() => {
					deleteId = project._id;
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