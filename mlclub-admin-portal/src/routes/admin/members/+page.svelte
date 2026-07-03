<script>
    let { data, form } = $props();

	let editingMember = $state(false);
	let editId = $state("");
	let memberForm = $state({
		name: "",
		year: "",
		team: "",
		position: "",
		github: "",
		linkedin: ""
	});

	function editMember(member) {
		editingMember = true;
		editId = member._id;

		memberForm = {
			name: member.name,
			year: member.year,
			team: member.team,
			position: member.position,
			github: member.github,
			linkedin: member.linkedin,
			photo: member.photo
		};
	}

	function cancelEdit() {
		editingMember = false;
		editId = "";

		memberForm = {
			name: "",
			year: "",
			team: "",
			position: "",
			github: "",
			linkedin: "",
			photo: ""
		};
	}
	let showDeleteModal = $state(false);
	let deleteId = $state("");
</script>


<div class="bg-white rounded-xl shadow p-6 mb-8">

	<h2 class="text-2xl font-semibold mb-4 text-center">
		Add Member
	</h2>

	<form
	method="POST"
	enctype="multipart/form-data"
	class="grid grid-cols-2 gap-4"
	action={editingMember ? "?/updateMember" : "?/addMember"}
>

		<input
		type="hidden"
		name="id"
		value={editId}
		/>
		<input
	type="text"
	name="name"
	placeholder="Name"
	class="border rounded-lg p-3"
	required
	bind:value={memberForm.name}
/>

		<select
	name="year"
	class="border rounded-lg p-3"
	required
	bind:value={memberForm.year}
>
			<option value="">Select Year</option>
			<option value="1st">1st</option>
			<option value="2nd">2nd</option>
			<option value="3rd">3rd</option>
			<option value="4th">4th</option>
		</select>
        <select
	name="team"
	class="border rounded-lg p-3"
	required
	bind:value={memberForm.team}
>
			<option value="">Select Team</option>
			<option value="ML core team">ML core team</option>
			<option value="Design team">Design team</option>
			<option value="Web development team">Web development team</option>
			<option value="Marketing team">Marketing team</option>
		</select>
		<select
	name="position"
	class="border rounded-lg p-3"
	required
	bind:value={memberForm.position}
>
			<option value="">Select Position</option>
			<option value="Junior Member">Junior Member</option>
			<option value="Executive">Executive</option>
			<option value="Head">Head</option>
		</select>

<input
	type="url"
	name="github"
	placeholder="GitHub URL"
	class="border rounded-lg p-3"
	bind:value={memberForm.github}
/>

		<input
	type="url"
	name="linkedin"
	placeholder="LinkedIn URL"
	class="border rounded-lg p-3"
	bind:value={memberForm.linkedin}
/>
<input
    type="file"
    name="photo"
    accept="image/*"
    class="border rounded-lg p-3"
/>
		<div class="col-span-2">
			<button
				type="submit"
				class="block mx-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
			>
				{editingMember ? "Update Member" : "Add Member"}
			</button>
			{#if editingMember}
<button
	type="button"
	class="block mx-auto bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
	onclick={cancelEdit}
>
	Cancel
</button>
{/if}
		</div>

	</form>
    {#if form?.error}
	<p class="mb-4 rounded bg-red-100 p-3 text-red-700">
		{form.error}
	</p>
    {/if}

    {#if form?.success}
	<p class="mb-4 rounded bg-green-100 p-3 text-green-700">
		Member added successfully.
	</p>
    {/if}

</div>

<h1 class="text-3xl font-bold mb-6">Members</h1>

<div class="bg-white rounded-xl shadow overflow-hidden">

	<table class="w-full">

		<thead class="bg-gray-100">

			<tr>

				<th class="p-4 text-left">Photo</th>
				<th class="p-4 text-left">Name</th>
				<th class="p-4 text-left">Position</th>
				<th class="p-4 text-left">Year</th>
				<th class="p-4 text-left">Team</th>
				<th class="p-4 text-left">LinkedIn</th>
				<th class="p-4 text-left">Github</th>
				<th class="p-4 text-left">Actions</th>
			</tr>

		</thead>

		<tbody>

			{#if data.members.length === 0}

				<tr>

					<td colspan="5" class="text-center p-6">
						No Members Found
					</td>

				</tr>

			{:else}

				{#each data.members as member}

					<tr class="border-t">

						<td class="p-4">

							<img
								src={member.photo}
								alt={member.name}
								class="w-14 h-14 rounded-full object-cover"
							/>

						</td>

						<td class="p-4">{member.name}</td>

						<td class="p-4">{member.position}</td>

						<td class="p-4">{member.year}</td>

						<td class="p-4">{member.team}</td>
						<td class="p-4"><a href={member.linkedin} target="_blank">{member.linkedin}</a></td>
						<td class="p-4"><a href={member.github} target="_blank">{member.github}</a></td>

						<td class="p-4">
							<button
	type="button"
	class="bg-yellow-500 text-white px-3 py-1 rounded"
	onclick={() => editMember(member)}
>
	Edit
</button>
							<form method="POST" action="?/deleteMember">

			<input
				type="hidden"
				name="id"
				value={member._id}
			/>

			<button
	type="button"
	class="bg-red-600 text-white px-3 py-1 rounded"
	onclick={() => {
		deleteId = member._id;
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
			Delete Member
		</h2>

		<p class="text-gray-600 mb-6">
			Are you sure you want to delete this member?
		</p>

		<div class="flex justify-end gap-3">

			<button
				type="button"
				class="border rounded-lg px-4 py-2 hover:bg-gray-100"
				onclick={() => (showDeleteModal = false)}
			>
				Cancel
			</button>

			<form method="POST" action="?/deleteMember">

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